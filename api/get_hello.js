// api/hello.js
module.exports = (req, res) => {
  const text = 'text' in req.query?req.query["text"]:"";
  result = {"text":text};
  res.status(200).json(result);
};