
// 核心逻辑函数
async function conditionsCore(conditionsStr, conditionTypesStr) {
  async function requestApi(apiUrl,method,apikey,params){
    try {
        const requestParam = {
          method: method,
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apikey}`
          },
          body: JSON.stringify(params),
        };
        const response = await fetch(apiUrl, requestParam);

        if (!response.ok) {
          console.log(response);
          throw new Error('Network response was not ok');
        }
        const data = response.json();
        return data;
    } catch (error) {
        console.error('Error fetching cart items:', error);
    }
  }

  const apiUrl = 'https://api.dify.ai/v1/workflows/run';
  const method = 'POST';
  const apikey = 'app-oP8Yb8ipIK9yEdhvOYtRaAs9';
  let conditionConfigList = [];
  const conditions = conditionsStr.split("||");
  const conditionTypes = conditionTypesStr.split("||");
  let conditionDefinitionCodeList = [];
  if(conditions && conditions.length>0 && conditionTypes && conditionTypes.length==conditions.length){
      for(let i=0;i<conditionTypes.length;i++){
          const conditionType = conditionTypes[i];
          const condition = conditions[i];
          const conditionDefinitionCode = `C${i+1}`;
          conditionDefinitionCodeList.push(conditionDefinitionCode);
          const params = 
          {
            "inputs": {
              "conditionType": conditionType,
              "condition": condition,
              "conditionDefinitionCode":conditionDefinitionCode
            },
            "response_mode": "blocking",
            "user": "abc-123"
          }
          // console.log(`apiUrl:${apiUrl}`);
          // console.log(`params:${JSON.stringify(params)}`);

          const data = await requestApi(apiUrl,method,apikey,params);
          // console.log(`data:${JSON.stringify(data)}`);
          if(data && 'data' in data && data['data'] 
          && 'outputs' in data['data'] && data['data']['outputs']
          && 'result' in data['data']['outputs'] && data['data']['outputs']['result']){
            conditionConfigList.push(data['data']['outputs']['result']);
            // console.log(`data:${JSON.stringify(data['data']['outputs']['result'])}`);
          }
          
      }
  }
  return {
      "conditionDefinitionList":conditionConfigList,
      "conditionDefinitionCodeList":conditionDefinitionCodeList
    }
}

module.exports= {conditionsCore};