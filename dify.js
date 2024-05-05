function main({ text }) {

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
  let str = replaceJSONHeader(text);
  str = fixJsonString(str);
  const result = JSON.parse(str);
  result['responseBy'] = '需求分析工程师1(检查信息完整性)';
  return {
    result: result
  }
}

const result = 
{
  "text": "{\"answer\": \"{\"validateResult\": \"success\", \"error\": \"\", \"nextStep\": \"理解促销基本信息\"}\"}"
}
// {
//   "result": {
//     "result": "fail",
//     "promotionName": "享受包礼品买赠活动",
//     "startDate": "",
//     "endDate": "2099-12-31 23:59:59",
//     "error": "缺少活动开始日期时间。",
//     "nextStep": "理解促销条件",
//     "responseBy": "需求分析工程师2(理解促销基本信息)"
//   }
// }
// let param = {};
// param['eng1_response'] = input["text"];

const result1 = main(result);
console.log(JSON.stringify(result1));
for(let key in result1){
  console.log(typeof(result1[key]));
}


const { v4: uuidv4 } = require('uuid');
const uniqueId = uuidv4();
console.log(uniqueId); // 输出类似 1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed