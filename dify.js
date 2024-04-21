function main({rulesFromVercel}) {
  let unescapedStr = rulesFromVercel.replace(/\\\\/g, '\\').replace(/\\\"/g, '"').replace(/\\n/g, '\n');
  const ruleList = JSON.parse(unescapedStr);
  let ruleListJSON = {};
  if('ruleList' in ruleList){
      ruleListJSON = ruleList['ruleList'];
  }
  return {
      ruleList: ruleListJSON
  }
}

const input = 
{
  "rulesFromVercel": "{\"ruleList\":[{\"code\":\"R1\",\"condition\":\"C1+C2\",\"consequence\":\"G1G2\",\"thresholdFlag\":false}]}"
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