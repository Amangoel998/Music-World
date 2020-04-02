const express = require("express");
const { getTopSongs } = require("../config/db");

const router = express.Router();
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    res.status(200).json(await getTopSongs());
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;