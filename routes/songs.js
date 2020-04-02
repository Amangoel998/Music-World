const express = require("express");
const { check, validationResult } = require("express-validator");
const { createSong, getAllArtists, getAllSongs } = require("../config/db");
const auth = require("../middleware/auth");
const router = express.Router();
const filevalidator = require("../middleware/filevalidator");

router.get("/", async (req, res) => {
  //res.status(200).json(await getAllSongs());
  res.render('song');
});

router.post(
  "/",
  filevalidator,
  [
    check("name", "Name is required")
      .isLength({ min: 2 })
      .not()
      .isEmpty(),
    check("album", "Album is required")
      .isLength({ min: 2 })
      .not()
      .isEmpty(),
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
      const artists = req.body.artists.split(/[\s,]+/);
      const cover_image = {
        data: req.files.cover_image.data,
        contentType: req.files.cover_image.mimetype
      };
      const newsong = {
        song_name: req.body.name,
        song_artists: artists,
        song_album: req.body.album,
        avg_rating: 0,
        song_releasedate: req.body.releasedate,
        song_cover: cover_image
      };
      const payload = await createSong(newsong);
      res.json(payload);
    } catch (err) {
      console.error(err);
      res.json({ error: err.message });
    }
  }
);
module.exports = router;
