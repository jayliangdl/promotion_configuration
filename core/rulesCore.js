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
function rulesCore(ruleDefinitionCode, giftsRelationshipStr, 
  giftDefinitionCodeListStr, conditionDefinitionCodeListStr) {
  let result = template;
  result = result.replaceAll("{{ruleDefinitionCode}}",ruleDefinitionCode);

  let condition = "";
  let conditionDefinitionCodeList = [];
  if(conditionDefinitionCodeListStr){
    conditionDefinitionCodeList = conditionDefinitionCodeListStr.split("||");
  }
  if(conditionDefinitionCodeList && conditionDefinitionCodeList.length>0){
    for(let i=0;i<conditionDefinitionCodeList.length;i++){
      condition+=conditionDefinitionCodeList[i];
      if(i+1<conditionDefinitionCodeList.length){
        condition+="+";
      }
    }
    result = result.replaceAll("{{condition}}",condition);
  }

  let giftDefinitionCodeList = [];
  if(giftDefinitionCodeListStr){
    giftDefinitionCodeList = giftDefinitionCodeListStr.split("||");
  }

  let consequence = "";
  let connectCodeBetweenGifts = "";
  if(giftsRelationshipStr=='多款赠品挑选一款'){
    connectCodeBetweenGifts="||";
  }else if(giftsRelationshipStr=="所有赠品一并赠送"){
    connectCodeBetweenGifts="+";
  }
  if(giftDefinitionCodeList && giftDefinitionCodeList.length>0){
    for(let i=0;i<giftDefinitionCodeList.length;i++){
      consequence+=giftDefinitionCodeList[i];
      if(i+1<giftDefinitionCodeList.length){
        consequence+=connectCodeBetweenGifts;
      }
    }
  }

  result = result.replaceAll("{{consequence}}",consequence);
  let resultJSON = {};
  try{
    // console.log(`result:${result}`);
    resultJSON = JSON.parse(result);
  }catch(err){
    console.error(err);
  }
  return resultJSON;
}

module.exports= {rulesCore};