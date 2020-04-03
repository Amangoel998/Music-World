const express = require("express");
const { check, validationResult } = require("express-validator");
const {
  createSong,
  getAllSongs,
  getAllArtists,
  updateSong
} = require("../config/db");
const auth = require("../middleware/auths");
const router = express.Router();
const filevalidator = require("../middleware/filevalidator");
const { songupdatevalidators } = require("../middleware/updatevalidators");
router.get("/", async (req, res) => {
  res.status(200).json(await getAllSongs());
});

router.post(
  "/",
  auth,
  filevalidator,
  [
    check("name", "Name is required").isLength({ min: 2 }),
    check("album", "Album is required").isLength({ min: 2 }),
    check("releasedate", "Wrong Date format {YYYY-MM-DD}").isISO8601(),
    check("artists", "Atleast one Artist is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(400).json({
          errors: errors.array().map(err => {
            return err.msg;
          })
        });
      }
      const artists = req.body.artists
        .trim()
        .split(/[\s,]+/)
        .filter(el => (el.length > 2 ? true : false));
      const allartists = (await getAllArtists()).map(el => el.id);
      if (!artists.every(el => allartists.includes(el))) {
        res.json({ error: "Given Artists not avaiable" });
        return;
      }
      const cover_image = {
        data: req.files.cover_image.data,
        contentType: req.files.cover_image.mimetype
      };
      const newsong = {
        song_name: req.body.name.trim(),
        song_artists: artists,
        song_album: req.body.album.trim(),
        user_ratings: [{ user: req.user, rating: req.body.user_rating }],
        song_releasedate: req.body.releasedate,
        song_cover: cover_image,
        avg_rating: req.body.user_rating
      };
      const payload = await createSong(newsong);
      res.json(payload);
    } catch (err) {
      console.error(err);
      res.json({ error: err.message });
    }
  }
);
router.put("/", auth, songupdatevalidators, async (req, res) => {
  try {
    const updatesong = {};
    if (req.body.name) updatesong.song_name = req.body.name.trim();
    if (req.body.releasedate) updatesong.song_releasedate = req.body.releasedate;
    if (req.body.album) updatesong.song_album = req.body.album.trim();
    res
      .status(200)
      .json({ message: await updateSong(req.body.song_id, updatesong) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});
module.exports = router;
