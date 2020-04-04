const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();

const jwt = require("jsonwebtoken");
const config = require("config");
const { loginUser } = require("../config/db");

router.post(
    "/", [
        check("password", "Password is Required").exists().isLength({ min: 6 }),
        check("email", "Email is required").isEmail()
    ],
    async(req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array()
                });
            }
            const user = {
                user_email: req.body.email.trim(),
                user_password: req.body.password.trim()
            };
            const payload = await loginUser(user);
            if (payload.error) {
                res.status(400).json(payload);
                return payload;
            }
            jwt.sign(
                payload,
                config.get("jwtKey"), { expiresIn: 36000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ message: "Server Error" });
        }
    }
);
module.exports = router;