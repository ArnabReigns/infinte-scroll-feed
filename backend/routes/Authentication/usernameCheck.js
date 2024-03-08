const User = require("../../models/UserModel");
const internalError = require("../../utils/InternalError");

const usernameCheck = async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username });

    setTimeout((e) => {
      if (user) return res.json({ exist: true });
      else return res.json({ exist: false });
    }, 1000);
  } catch (res) {
    return internalError(res);
  }
};

module.exports = usernameCheck;
