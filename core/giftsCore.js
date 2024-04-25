
// 核心逻辑函数
async function giftsCore(giftDescsStr) {
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
// if(!giftDescsStr){
//   return {}
// }
const apiUrl = 'https://api.dify.ai/v1/workflows/run';
const method = 'POST';
const apikey = 'app-nu3A4RrG5q5d1I1FrhUuoscV';
let giftConfigList = [];
let giftDefinitionCodeList = [];
const giftDescs = giftDescsStr.split("||");
if(giftDescs && giftDescs.length>0){
    for(let i=0;i<giftDescs.length;i++){
        const giftDesc = giftDescs[i];
        const giftDefinitionCode = `G${i+1}`;
        giftDefinitionCodeList.push(giftDefinitionCode);
        const params = 
        {
          "inputs": {
            "giftDesc": giftDesc,
            "giftDefinitionCode":giftDefinitionCode
          },
          "response_mode": "blocking",
          "user": "abc-123"
        }
        const data = await requestApi(apiUrl,method,apikey,params);
        // console.log(`data:${JSON.stringify(data)}`);
        if(data && 'data' in data && data['data'] 
        && 'outputs' in data['data'] && data['data']['outputs']
        && 'giftConfiguration' in data['data']['outputs'] && data['data']['outputs']['giftConfiguration']){
          giftConfigList.push(data['data']['outputs']['giftConfiguration']);
          // console.log(`data:${JSON.stringify(data['data']['outputs'])}`);
        }
        
    }
}
return {
  'giftDefinitionList':giftConfigList,
  'giftDefinitionCodeList':giftDefinitionCodeList
  };
}
  

module.exports= {giftsCore};