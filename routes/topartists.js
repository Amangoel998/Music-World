const express = require("express");
const { getTopArtists } = require("../config/db");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const topartists = await getTopArtists();
    res.status(200).json(Array.from(topartists));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
