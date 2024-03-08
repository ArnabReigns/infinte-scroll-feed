const jwt = require("jsonwebtoken");
const path = require("path");
const ejs = require("ejs");
const nodemailer = require("nodemailer");
const User = require("../../../models/UserModel");

const sendVerifyEmail = async (data, baseUrl) => {
  try {
    const token = jwt.sign({ user: data.email }, process.env.SECRET_KEY, {
      expiresIn: "5m",
    });

    const html = await ejs.renderFile(
      path.join(__dirname + "/../../../templates/mailVerification.ejs"),
      {
        name: data.first_name,
        link: `${
          process.env.PROD == "true" ? "https://" : "http://"
        }${baseUrl}/api/auth/accounts/activation/${token}`,
      }
    );

    await nodemailer
      .createTransport({
        service: "gmail",
        auth: {
          user: "arnabchatterjee912@gmail.com",
          pass: process.env.APP_PASSWORD,
        },
      })
      .sendMail({
        from: "arnabchatterjee912@gmail.com",
        to: data.email,
        subject: "Email Verification Link",
        html: html,
      });

    return true;
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
};

module.exports = sendVerifyEmail;
