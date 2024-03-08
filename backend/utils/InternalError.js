const internalError = (res) => {
  return res.status(500).json({ error: true, msg: "Internal server error" });
};

module.exports = internalError;
