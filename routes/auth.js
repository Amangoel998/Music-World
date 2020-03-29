const express = require("express");
const auth = require("../../middleware/auth");
const check = require("express-validator").check;
const router = express.Router();

const loginUser = require("../config/db");

router.post(
  "/",
  [
    auth,
    check("password", "Password is Required").exists(),
    check("email", "Email is required").isEmail()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    const user = req.body;

    try {
      return await loginUser(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
module.exports = router;
