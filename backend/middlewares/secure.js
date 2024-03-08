const secure = (req, res, next) => {
  if (!req.user)
    return res
      .status(401)
      .json({ error: true, msg: "User not authorised. Please log in." });
  else next();
};

module.exports = secure;
