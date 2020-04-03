const express = require("express");
const fs = require("fs");
const { getImage } = require("../config/db");

const router = express.Router();
const auth = require("../middleware/auths");

router.get("/:id", auth, async (req, res) => {
  try {
    const data = (await getImage(req.params.id)).image;
    res.status(200).send(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});
module.exports = router;
