const jwt = require("jsonwebtoken");
const internalError = require("../../utils/InternalError");
const User = require("../../models/UserModel");

const me = async (req, res) => {
  const token = req.cookies.tlog;

  if (!token)
    return res.status(401).json({
      loggedin: false,
    });

  jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
    if (err)
      return res.status(404).json({
        loggedin: false,
        msg: "invalid or expired token",
      });

    if (decoded) {
      try {
        const user = await User.findOne(
          { username: decoded.username },
          "-_id -__v -password"
        );
        if (user)
          return res.status(200).json({
            loggedin: true,
            user: user,
          });
      } catch (e) {
        console.log(e);
        return internalError(res);
      }
    }
  });
};

module.exports = me;
