const template = `{
	"conditionDefinitionList": {{conditionDefinitionList}},
	"giftDefinitionList": {{giftDefinitionList}},
	"ratioDefinitionList": [],
	"ruleList": {{ruleList}}
}
  `
  // 核心逻辑函数
  function promotionCore(conditionDefinitionList, giftDefinitionList, ruleList) {
    let result = template;
    result = result.replaceAll("{{conditionDefinitionList}}",conditionDefinitionList);
    result = result.replaceAll("{{giftDefinitionList}}",giftDefinitionList);
    result = result.replaceAll("{{ruleList}}",ruleList);
  
    return {
        "result":result
    }
  }
  
  module.exports= {promotionCore};