// const ba1_response = "{\n  \"human_message_type\":\"促销活动要求\",\n  \"agent_message\": \"您好！\n很高兴您希望配置一个新的促销活动。\"\n}";
// function fixNewLinesInJson(jsonString) {
//   // 替换字符串中的实际换行符为 JSON 标准的换行转义字符
//   return jsonString.replace(/\n/g, '');
// }
// function main({ba1_response}) {
//     // let unescapedStr = ba1_response.replace(/\\\\/g, '\\').replace(/\\\"/g, '"').replace(/\\n/g, '');
//     // let unescapedStr = ba1_response.replace(/\\\\/g, '\\').replace(/\\"/g, '\"').replace(/\\n/g, '\\n');
//     // console.log(unescapedStr);
//     const object = JSON.parse(ba1_response);
//     return {
//         ba1_response: object
//     }
// }

// const fixed_json_string = fixNewLinesInJson(ba1_response);
// console.log(fixed_json_string);
// const ba1_response_json = main({ba1_response:fixed_json_string});

// console.log(`ba1_response_json:${JSON.stringify(ba1_response_json)}`);











async function main({eng1_response, eng2_response}) {
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
          // console.log(`requestParam:${JSON.stringify(requestParam)}`);
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
  if(eng2_response && eng2_response.length>0 
    && eng1_response && 'conditions' in eng1_response && eng1_response['conditions'].length==eng2_response.length
    && 'conditionDefinitionCode' in eng1_response && eng1_response['conditionDefinitionCode'].length==eng2_response.length){
      for(let i=0;i<eng2_response.length;i++){
          const conditionType = eng2_response[i];
          const condition = eng1_response['conditions'][i];
          const conditionDefinitionCode = eng1_response['conditionDefinitionCode'][i];
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
          conditionConfigList.push(data);
      }
  }
  console.log(`conditionConfigList:${JSON.stringify(conditionConfigList)}`);
  return {
    conditionConfigList:conditionConfigList
  }
}

const eng1_response = 
{
    "condition_count": 2,
    "condition_relationship": "or",
    "conditions": [
      "购买鲜花系列（编号7001-7010）任意3束",
      "购买蛋糕系列（编号8001-8005）满200元"
    ],
    "conditionDefinitionCode":[
      "C1","C2"
    ]
}

const eng2_response = [
  "系列商品数量满N个",
  "系列商品金额满N元"
]

const result = main({eng1_response, eng2_response});
result.then(resp=>{
  console.log(`resp:${JSON.stringify(resp)}`);
})

