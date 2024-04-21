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
    const conditionsFromVercelJSON = JSON.parse(conditionsFromVercelStr);
    if('data' in conditionsFromVercelJSON){
      conditionsFromVercelJSON['data']
    }
    return {
        conditions: object
    }
}

const input = 
{
  "conditionsFromVercel": "{\"data\":[{\"result\":{\"bvFlag\":false,\"code\":\"C1\",\"desc\":\"\",\"exceedFlag\":true,\"exceptItems\":[],\"itemClass1s\":[],\"itemClass2s\":[],\"itemClass3s\":[],\"itemClass4s\":[],\"itemClass5s\":[],\"itemClass6s\":[],\"itemClass7s\":[],\"itemClass8s\":[],\"itemClass9s\":[],\"items\":[{\"code\":\"3001\",\"quantity\":2}],\"levelInfo\":{\"flag\":false,\"itemCatalogQuantity\":0,\"levelQuantity\":0},\"quantity\":2}}]}"
}
const result = main(input);
console.log(JSON.stringify(result));
for(let key in result){
  console.log(typeof(result[key]));
}  