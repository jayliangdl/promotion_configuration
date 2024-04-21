const template = `{
"ruleList": [{
  "code": "{{ruleDefinitionCode}}",
  "condition": "{{condition}}",
  "consequence": "{{consequence}}",
  "thresholdFlag": false
}]
}
`
// 核心逻辑函数
function rulesCore(ruleDefinitionCode, giftsRelationshipStr, giftsDefinitionCodes, conditionDefinitionCodesStr) {
  let result = template;
  result = result.replaceAll("{{ruleDefinitionCode}}",ruleDefinitionCode);

  let condition = conditionDefinitionCodesStr;
  if(condition){
    condition = condition.replaceAll("||","+");
    result = result.replaceAll("{{condition}}",condition);
  }
  let consequence = "";
  if(giftsRelationshipStr=='多款赠品挑选一款'){
    if(giftsDefinitionCodes && giftsDefinitionCodes.length>0){
      consequence = giftsDefinitionCodes.replaceAll("||","||");
    }
  }else if(giftsRelationshipStr=="所有赠品一并赠送"){
    if(giftsDefinitionCodes && giftsDefinitionCodes.length>0){
      consequence = giftsDefinitionCodes.replaceAll("||","+");
    }
  }
  result = result.replaceAll("{{consequence}}",consequence);
  let resultJSON = {};
  try{
    console.log(`result:${result}`);
    resultJSON = JSON.parse(result);
  }catch(err){
    console.error(err);
  }
  return {
      "result":resultJSON
  }
}

module.exports= {rulesCore};