const express = require("express");
const { getImage } = require("../config/db");

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const image = (await getImage(req.params.id)).image;
    res.status(200).send(image);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});
module.exports = router;
