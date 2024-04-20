const {giftsCore} = require('../core/giftsCore');

module.exports = async (req, res) => {
  const { giftDescs } = req.body;
  try {
    const result = await giftsCore(giftDescs);
    res.status(200).json(result);
    res.end(); // 关闭连接
  } catch (error) {
    res.status(500).send(error.message);
  }
  
};
