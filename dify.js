function main({ eng1_response }) {
  function replaceJSONHeader(str){
    let ret = str
    if(str){
      ret = str.replace('```json','');
      ret = ret.replace('```','');
    }
    return ret;
  }
  function fixJsonString(jsonString) {
    let inQuotes = false;  // 用来跟踪是否在引号内
    let result = '';
  
    for (let i = 0; i < jsonString.length; i++) {
      const char = jsonString[i];
      const nextChar = jsonString[i + 1];
  
      if (char === '"' && (i === 0 || jsonString[i - 1] !== '\\')) {
        // 遇到非转义的双引号，切换状态
        inQuotes = !inQuotes;
      }
  
      if (char === '\n' && !inQuotes) {
        // 忽略引号外的换行符
        continue;
      }
  
      if (char === '\n' && inQuotes) {
        // 将引号内的换行符替换为\\n
        result += '\\n';
      } else {
        result += char;
      }
    }
  
    return result;
  }
  let fixed_json_string = eng1_response;
  fixed_json_string = replaceJSONHeader(fixed_json_string);
  fixed_json_string = fixJsonString(fixed_json_string);
    console.log(fixed_json_string);  // 输出转换后的字符串以检查
    const object = JSON.parse(fixed_json_string);
    return {
        eng1_response: object
    }
}

const input = 
{
  "text": "```json\n{\n  \"code\": {\n    \"bvFlag\": false,\n    \"code\": \"C1\",\n    \"desc\": \"\",\n    \"dp\": \"1500\",\n    \"exceedFlag\": true,\n    \"exceptItems\": [],\n    \"itemClass1s\": [],\n    \"itemClass2s\": [],\n    \"itemClass3s\": [],\n    \"itemClass4s\": [],\n    \"itemClass5s\": [],\n    \"itemClass6s\": [],\n    \"itemClass7s\": [],\n    \"itemClass8s\": [],\n    \"itemClass9s\": [],\n    \"items\": [\n      {\n        \"code\": \"86456\",\n        \"quantity\": 0\n      },\n      {\n        \"code\": \"86457\",\n        \"quantity\": 0\n      },\n      {\n        \"code\": \"86458\",\n        \"quantity\": 0\n      },\n      {\n        \"code\": \"86459\",\n        \"quantity\": 0\n      },\n      {\n        \"code\": \"87243\",\n        \"quantity\": 0\n      }\n    ],\n    \"levelInfo\": {\n      \"flag\": false,\n      \"itemCatalogQuantity\": 0,\n      \"levelQuantity\": 0\n    },\n    \"quantity\": 0\n  },\n  \"business\": {\n    \"type\": \"系列商品金额满N元\",\n    \"products\": [\n      \"86456\",\n      \"86457\",\n      \"86458\",\n      \"86459\",\n      \"87243\"\n    ],\n    \"amount\": \"1500\"\n  }\n}\n```",
  "usage": {
    "prompt_tokens": 1071,
    "prompt_unit_price": "0",
    "prompt_price_unit": "0",
    "prompt_price": "0.0000000",
    "completion_tokens": 561,
    "completion_unit_price": "0",
    "completion_price_unit": "0",
    "completion_price": "0.0000000",
    "total_tokens": 1632,
    "total_price": "0.0000000",
    "currency": "USD",
    "latency": 5.65804136171937
  }
}
let param = {};
param['eng1_response'] = input["text"];
const result = main(param);
console.log(JSON.stringify(result));
for(let key in result){
  console.log(typeof(result[key]));
}

// const json = 
// {
//   "conditionDefinitionList": [
//     {
//       "bvFlag": false,
//       "code": "C1",
//       "desc": "",
//       "exceedFlag": true,
//       "exceptItems": [],
//       "itemClass1s": [],
//       "itemClass2s": [],
//       "itemClass3s": [],
//       "itemClass4s": [],
//       "itemClass5s": [],
//       "itemClass6s": [],
//       "itemClass7s": [],
//       "itemClass8s": [],
//       "itemClass9s": [],
//       "items": [
//         {
//           "code": "7001",
//           "quantity": 0
//         },
//         {
//           "code": "7002",
//           "quantity": 0
//         },
//         {
//           "code": "7003",
//           "quantity": 0
//         },
//         {
//           "code": "7004",
//           "quantity": 0
//         },
//         {
//           "code": "7005",
//           "quantity": 0
//         },
//         {
//           "code": "7006",
//           "quantity": 0
//         },
//         {
//           "code": "7007",
//           "quantity": 0
//         },
//         {
//           "code": "7008",
//           "quantity": 0
//         },
//         {
//           "code": "7009",
//           "quantity": 0
//         },
//         {
//           "code": "7010",
//           "quantity": 0
//         }
//       ],
//       "levelInfo": {
//         "flag": false,
//         "itemCatalogQuantity": 0,
//         "levelQuantity": 0
//       },
//       "quantity": 3
//     },
//     {
//       "bvFlag": false,
//       "code": "C2",
//       "desc": "",
//       "exceedFlag": true,
//       "exceptItems": [],
//       "itemClass1s": [],
//       "itemClass2s": [],
//       "itemClass3s": [],
//       "itemClass4s": [],
//       "itemClass5s": [],
//       "itemClass6s": [],
//       "itemClass7s": [],
//       "itemClass8s": [],
//       "itemClass9s": [],
//       "items": [
//         {
//           "code": "8001",
//           "quantity": 0
//         },
//         {
//           "code": "8002",
//           "quantity": 0
//         },
//         {
//           "code": "8003",
//           "quantity": 0
//         },
//         {
//           "code": "8004",
//           "quantity": 0
//         },
//         {
//           "code": "8005",
//           "quantity": 0
//         }
//       ],
//       "levelInfo": {
//         "flag": false,
//         "itemCatalogQuantity": 0,
//         "levelQuantity": 0
//       },
//       "quantity": 200
//     }
//   ]
// }
// let str = JSON.stringify(json);
// str = str.replaceAll("\"","\\\"");
// console.log(str);