const required = (list) => (req, res, next) => {
  
  for (let i = 0; i < list.length; i++) {
    if (req.body[list[i]] == null) {
      return res
        .status(400)
        .json({ field: list[i], msg: `${list[i]} is required` });
    }
  }

  next();
};

module.exports = required;
