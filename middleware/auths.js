const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) res.status(403).json({ msg: "No token, authorization Denied" });
  try {
    const payload = jwt.verify(token, config.get("jwtKey"), (err, res) => {
        console.log(res)
      if (err || !res.user) throw new Error("Wrong token");
    });
    console.log("Payload is Here", payload)
    req.user = payload.user;
    if(payload.user)next();
  } catch (err) {
    res.status(403).json({ msg: "Token not valid or expired" });
  }
};
