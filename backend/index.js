const express = require("express");
const app = express();
const dotenv = require("dotenv");
var cors = require("cors");
var cookieParser = require("cookie-parser");
const AuthRouter = require("./routes/Authentication/index");
const PostRouter = require("./routes/posts/index");
const chalk = require("chalk");
const auth = require("./middlewares/auth");
const secure = require("./middlewares/secure");
const apikey = require("./middlewares/apikey");
dotenv.config();
require("./db");

// cors
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
    allowedHeaders: ["Content-Type", "Authorization", "x-api-key"],
  })
);

// cookie parser
app.use(cookieParser());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api-key
app.use(apikey);

// routes
app.get("/", auth, (req, res) => {
  return res.send("API at " + req.headers.host);
});

// authentication routes
app.use("/api/auth", AuthRouter);
app.use("/api/posts", [auth, secure], PostRouter);

// listener
app.listen(process.env.PORT || 4000, () => {
  console.clear();
  console.log(chalk.yellow.bold(`Server started on PORT: ${process.env.PORT}`));
});
