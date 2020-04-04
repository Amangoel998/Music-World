const express = require("express");
const { getTopSongs } = require("../config/db");

const router = express.Router();
const auth = require("../middleware/auths");

router.get("/", async (req, res) => {
  try {
    await res.status(200).json(await getTopSongs());
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
