const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.cookies.tlog;

  if (!token) {
    req.user = null;
    return next();
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
    if (err) {
      req.user = null;
      return next();
    }
    req.user = decode.username;
    return next();
  });
};

module.exports = auth;
