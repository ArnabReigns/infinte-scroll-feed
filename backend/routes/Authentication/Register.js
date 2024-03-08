const User = require("../../models/UserModel");
const jwt = require("jsonwebtoken");
var ejs = require("ejs");
var path = require("path");
const sendVerifyEmail = require("./utils/VerifyEmail");

const register = async (req, res) => {
  const data = req.body;

  // check for existing user

  let userExist = await User.findOne({ username: data.username });

  if (userExist)
    return res
      .status(409)
      .json({ error: true, msg: "username already exists" });

  userExist = await User.findOne({ email: data.email });

  if (userExist)
    return res.status(409).json({ error: true, msg: "email already exists" });

  // sending email verification mail

  const APP_PASSWORD = process.env.APP_PASSWORD;

  if (APP_PASSWORD != undefined) sendVerifyEmail(data, req.headers.host);

  new User({
    first_name: data.first_name,
    last_name: data.last_name,
    username: data.username,
    email: data.email,
    password: data.password,
    isActive: APP_PASSWORD == undefined ? true : false, // just in case APP_PASSWORD is not set in .env this will allow users to login
  })
    .save()
    .then((user) => {
      // if verification email is not sent then user will be auto logged in after signup
      if (APP_PASSWORD == undefined) {
        const token = jwt.sign(
          { username: user.username },
          process.env.SECRET_KEY,
          {
            expiresIn: "7d",
          }
        );

        res.cookie("tlog", token, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });

        return res.send({
          msg: "User registered successfully",
          emailsent: false,
          data: {
            username: user?.username,
            email: user?.email,
          },
        });
      }

      return res.send({
        msg: "User registered successfully",
        emailsent: true,
        data: {
          username: user?.username,
          email: user?.email,
        },
      });
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(500)
        .json({ err: true, msg: "Some internal error occurred" });
    });
};

module.exports = register;
