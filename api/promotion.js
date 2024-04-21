const {promotionCore} = require('../core/promotionCore');

module.exports = async (req, res) => {
  const { conditionDefinitionList, giftDefinitionList, ruleList } = req.body;
  try {
    const result = await promotionCore( conditionDefinitionList, giftDefinitionList, ruleList );
    res.status(200).json(result);
    res.end(); // 关闭连接
  } catch (error) {
    res.status(500).send(error.message);
  }
  
};
