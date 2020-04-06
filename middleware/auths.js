const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  try {
    const token = req.body.Authorization
    if (!token)
      return res.status(403).json({ msg: "No token, authorization Denied" });
    const payload = jwt.verify(token, config.get("jwtKey"));
    req.user = payload.user;
    if (payload.user) next();
  } catch (err) {
    return res.status(403).json({ msg: "Token not valid or expired" });
  }
};
