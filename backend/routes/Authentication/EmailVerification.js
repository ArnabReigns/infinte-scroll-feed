const chalk = require("chalk");
const User = require("../../models/UserModel");
const jwt = require("jsonwebtoken");

const emailVerification = (req, res) => {
  const token = req.params.id;

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.send("Activation Link Expired. Try Again!");
    } else {
      const email = decoded.user;
      console.log(chalk.green(`${email} is now activated`));

      return User.findOneAndUpdate(
        { email: email },
        {
          isActive: true,
        },
        {
          new: true,
        }
      )
        .then((r) => {
          const token = jwt.sign(
            { username: r.username },
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
          return res.redirect("http://localhost:5173/");
        })
        .catch((e) => res.send("Error Occured"));
    }
  });
};

module.exports = emailVerification;
