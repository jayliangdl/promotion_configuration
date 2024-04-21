function main({ conditionsFromVercel }) {

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
  const conditionsFromVercelStr = fixJsonString(conditionsFromVercel);
    // console.log(fixed_json_string);  // 输出转换后的字符串以检查
    const conditionsFromVercelJSON = JSON.parse(conditionsFromVercelStr);
    let conditionDefinitionList = {};
    if('conditionDefinitionList' in conditionsFromVercelJSON){
      conditionDefinitionList = conditionsFromVercelJSON['conditionDefinitionList'];
    }
    return {
      conditionDefinitionList: conditionDefinitionList
    }
}


const input = 
{
  "conditionsFromVercel": "{\"conditionDefinitionList\":[{\"bvFlag\":false,\"code\":\"C1\",\"desc\":\"\",\"exceedFlag\":true,\"exceptItems\":[],\"itemClass1s\":[],\"itemClass2s\":[],\"itemClass3s\":[],\"itemClass4s\":[],\"itemClass5s\":[],\"itemClass6s\":[],\"itemClass7s\":[],\"itemClass8s\":[],\"itemClass9s\":[],\"items\":[{\"code\":\"7001\",\"quantity\":0},{\"code\":\"7002\",\"quantity\":0},{\"code\":\"7003\",\"quantity\":0},{\"code\":\"7004\",\"quantity\":0},{\"code\":\"7005\",\"quantity\":0},{\"code\":\"7006\",\"quantity\":0},{\"code\":\"7007\",\"quantity\":0},{\"code\":\"7008\",\"quantity\":0},{\"code\":\"7009\",\"quantity\":0},{\"code\":\"7010\",\"quantity\":0}],\"levelInfo\":{\"flag\":false,\"itemCatalogQuantity\":0,\"levelQuantity\":0},\"quantity\":3},{\"bvFlag\":false,\"code\":\"C2\",\"desc\":\"\",\"exceedFlag\":true,\"exceptItems\":[],\"itemClass1s\":[],\"itemClass2s\":[],\"itemClass3s\":[],\"itemClass4s\":[],\"itemClass5s\":[],\"itemClass6s\":[],\"itemClass7s\":[],\"itemClass8s\":[],\"itemClass9s\":[],\"items\":[{\"code\":\"8001\",\"quantity\":0},{\"code\":\"8002\",\"quantity\":0},{\"code\":\"8003\",\"quantity\":0},{\"code\":\"8004\",\"quantity\":0},{\"code\":\"8005\",\"quantity\":0}],\"levelInfo\":{\"flag\":false,\"itemCatalogQuantity\":0,\"levelQuantity\":0},\"quantity\":200}]}"
}
const result = main(input);
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