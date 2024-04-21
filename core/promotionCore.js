  // 核心逻辑函数
  function promotionCore(conditionDefinitionListStr, giftDefinitionListStr, ruleListStr) {
    let conditionDefinitionList = [];
    try{
      conditionDefinitionList = JSON.parse(conditionDefinitionListStr);
    }catch(error){
      console.error(error);
    }
    let giftDefinitionList = [];
    try{
      giftDefinitionList = JSON.parse(giftDefinitionListStr);
    }catch(error){
      console.error(error);
    }
    let ruleList = [];
    try{
      ruleList = JSON.parse(ruleListStr);
    }catch(error){
      console.error(error);
    }

    let result = {
      conditionDefinitionList:conditionDefinitionList,
      giftDefinitionList:giftDefinitionList,
      ratioDefinitionList:[],
      ruleList:ruleList
    };
    return {
      result
    }
  }
  
  module.exports= {promotionCore};