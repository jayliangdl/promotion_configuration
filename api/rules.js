const {rulesCore} = require('../core/rulesCore');

module.exports = async (req, res) => {
  const { ruleDefinitionCode, giftsRelationshipStr, giftDefinitionCodeStr, conditionDefinitionCodeStr } = req.body;
  try {
  let conditionDefinitionCodeList = [];
  if(conditionDefinitionCodeStr){
    conditionDefinitionCodeList = conditionDefinitionCodeStr.split("||");
  }

  let giftDefinitionCodeList = [];
  if(giftDefinitionCodeStr){
    giftDefinitionCodeList = giftDefinitionCodeStr.split("||");
  }
    const result = await rulesCore( ruleDefinitionCode, giftsRelationshipStr, giftDefinitionCodeList, conditionDefinitionCodeList );
    res.status(200).json(result);
    res.end(); // 关闭连接
  } catch (error) {
    res.status(500).send(error.message);
  }
  
};
