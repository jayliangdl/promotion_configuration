const {giftsCore} = require('../core/giftsCore');

module.exports = async (req, res) => {
  const { giftDescsStr } = req.body;
  try {
    const result = await giftsCore(giftDescsStr);
    res.status(200).json(result);
    res.end(); // 关闭连接
  } catch (error) {
    res.status(500).send(error.message);
  }
  
};
