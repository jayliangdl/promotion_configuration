// api/hello.js
module.exports = (req, res) => {
  const {text} = req.body;
  result = {"text":text};
  res.status(200).json(result);
};