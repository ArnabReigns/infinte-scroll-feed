const apikey = (req, res, next) => {
  if (req.path.includes("/api/auth/accounts/activation/")) return next();

  if (!req.headers["x-api-key"])
    return res.status(403).json({ msg: "Missing API Key" });

  let key = req.headers["x-api-key"];
  if (key != "secret-api-key-1234") {
    return res.status(401).json({ msg: "Invalid API Key" });
  }

  next();
};

module.exports = apikey;
