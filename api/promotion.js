const {promotionCore} = require('../core/promotionCore');

module.exports = async (req, res) => {
  const { conditionDefinitionListStr, giftDefinitionListStr, ruleListStr } = req.body;
  try {
    const result = await promotionCore( conditionDefinitionListStr, giftDefinitionListStr, ruleListStr );
    res.status(200).json(result);
    res.end(); // 关闭连接
  } catch (error) {
    res.status(500).send(error.message);
  }
  
};
