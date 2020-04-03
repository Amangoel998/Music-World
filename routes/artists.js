const express = require("express");
const { check, validationResult } = require("express-validator");
const { createArtist, getAllArtists, updateArtist } = require("../config/db");

const router = express.Router();
const auth = require("../middleware/auths");
const { artistupdatevalidators } = require("../middleware/updatevalidators");

router.get("/", auth, async (req, res) => {
  res.status(200).json(await getAllArtists());
});

router.post(
  "/",
  auth,
  [
    check("name", "Artist Name is required")
      .isLength({ min: 2 })
      .not()
      .isEmpty(),
    check("dob", "Wrong Date format {YYYY-MM-DD}").isISO8601()
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
      const new_artist = {
        artist_name: req.body.name.trim(),
        artist_dob: req.body.dob,
        artist_bio: req.body.bio.trim()
      };
      res.json(await createArtist(new_artist));
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  }
);
router.put("/", auth, artistupdatevalidators, async (req, res) => {
  try {
    const updateartist = {};
    if (req.body.name) updateartist.artist_name = req.body.name.trim();
    if (req.body.album) updateartist.artist_dob = req.body.album;
    if (req.body.bio) updateartist.artist_bio = req.body.bio.trim();
    res
      .status(200)
      .json({ message: await updateArtist(req.body.artist_id, updateartist) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});
module.exports = router;
