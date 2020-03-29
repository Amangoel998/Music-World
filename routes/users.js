const express = require("express");
const check = require("express-validator").check;
const { createUser } = require("../config/db");

const router = express.Router();

router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("password", "Password Required").isLength({ min: 6 }),
    check("email", "Email is required").isEmail()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    const newuser = req.body;
    try {
      return await createUser(newuser);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
module.exports = router;
