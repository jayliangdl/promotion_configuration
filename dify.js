function main({ eng1_response }) {

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
  const fixed_json_string = fixJsonString(eng1_response);
    // console.log(fixed_json_string);  // 输出转换后的字符串以检查
    const conditions = JSON.parse(fixed_json_string);
    let conditionsStr = "";
    if('conditions' in conditions){
      for(let i=0;i<conditions['conditions'].length;i++){
        const condition = conditions['conditions'][i];
        console.log(`condition:${JSON.stringify(condition)}`);
        conditionsStr+=condition;
        if(i+1<conditions['conditions'].length){
          conditionsStr+="||";
        }
      }
    }
    return {
        eng1_response: conditions,
        conditionsStr: conditionsStr
    }
}

const eng1_response = "{\n  \"condition_count\": 2,\n  \"condition_relationship\": \"or\",\n  \"conditions\": [\n    \"购买鲜花系列（编号7001-7010）任意3束\",\n    \"购买蛋糕系列（编号8001-8005）满200元\"\n  ]\n}";
const result = main({eng1_response});
console.log(JSON.stringify(result));  