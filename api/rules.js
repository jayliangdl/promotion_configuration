const {rulesCore} = require('../core/rulesCore');

module.exports = async (req, res) => {
  const { ruleDefinitionCode, giftsRelationshipStr, giftsDefinitionCodes, conditionDefinitionCodesStr } = req.body;
  try {
    const result = await rulesCore( ruleDefinitionCode, giftsRelationshipStr, giftsDefinitionCodes, conditionDefinitionCodesStr );
    res.status(200).json(result);
    res.end(); // 关闭连接
  } catch (error) {
    res.status(500).send(error.message);
  }
  
};
