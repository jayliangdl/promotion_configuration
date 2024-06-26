const utils = require('./utils');
const constanst = require('./constanst');
const { v4: uuidv4 } = require('uuid');

// const DIFY_TOKEN = 'app-Egk9uUV3iPiy5MikuEoADwNy';
const DIFY_TOKEN =  'app-p54opRprkx4gCpbiq4bJ44Mb';//正式的
// const DIFY_TOKEN = 'app-yqw3LwThEFzrTq9eTT3G21q4';//调试的

// 核心逻辑函数
// 核心逻辑函数
async function chatCore(humanMessage, {step,conditionsStr,conditionTypesStr,giftDescsStr,giftsRelationshipStr,promotionBaseInfoStr}, sessionId, userId) {
  const body = JSON.stringify({
    "inputs": {
      // "str1":humanMessage
      "promotion_requirement":humanMessage,
      "step":step,
      "conditionsStr":conditionsStr?conditionsStr:"",
      "conditionTypesStr":conditionTypesStr?conditionTypesStr:"",
      "giftDescsStr":giftDescsStr?giftDescsStr:"",
      "giftsRelationshipStr":giftsRelationshipStr?giftsRelationshipStr:"",
      "promotionBaseInfoStr":promotionBaseInfoStr?promotionBaseInfoStr:"",
    },
    // "response_mode": "streaming",
    "response_mode": "blocking",
    "user": userId
  });
  
  const headers = {
    'Authorization': `Bearer ${DIFY_TOKEN}`,
    'User-Agent': 'Node.js',
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body)
  }
  const hostname='api.dify.ai';
  const path='/v1/workflows/run';

  const status = '1';
  // console.log(`\n\nrequest:${body}`)
  const response = await utils.sendPostRequest(hostname, path, headers, body); // 传递 sendEventStreamData 至 utils.sendPostRequest
  console.log(`body:${body}`);
  console.log("\n");
  console.log(`response:${JSON.stringify(response)}`);

  console.log("\n");
  console.log("\n");
  if('data' in response && 'outputs' in response['data'] 
    && 'result' in response['data']['outputs'] 
    && 'responseBy' in response['data']['outputs']['result'] 
    && response['data']['outputs']['result']['responseBy']==='SA-促销配置编写'){
    if('promotion' in response['data']['outputs']['result']){
      const promotion = response['data']['outputs']['result']['promotion'];
      const promotionConfiguration = JSON.stringify(promotion);
      const uniqueId = uuidv4();
      const sql = `INSERT INTO promotion_solution (id,session_id,user_id,promotion_configuration,status) 
      VALUES ('${uniqueId}','${sessionId}','${userId}','${promotionConfiguration}','${status}');`;
      // 插入数据的示例
      const dataToInsert = {
        uniqueId: uniqueId,
        sessionId: sessionId,
        userId: userId,
        promotionConfiguration: promotionConfiguration,
        created_at: new Date()
      };
      response['data']['outputs']['result']['solutionId'] = uniqueId;
      const parameters = [dataToInsert.uniqueId, dataToInsert.sessionId, dataToInsert.userId, dataToInsert.promotionConfiguration];
      utils.runSQL(constanst.mySQLConnectionConfig,sql,parameters);
    }
  }
  const result = response;
  return result;
}

// async function chatCore(humanMessage, sessionId, userId,sendEventStreamData) {
//   const data = JSON.stringify({
//     "inputs": {
//       // "str1":humanMessage
//       "promotion_requirement":humanMessage,
//       "step":"检查信息完整性"
//     },
//     // "response_mode": "streaming",
//     "response_mode": "blocking",
//     "user": userId
//   });
//   const headers = {
//     'Authorization': `Bearer ${DIFY_TOKEN}`,
//     'User-Agent': 'Node.js',
//     'Content-Type': 'application/json',
//     'Content-Length': Buffer.byteLength(data)
//   }
//   const hostname='api.dify.ai';
//   const path='/v1/workflows/run';

  // const status = '1';
  // const promotionConfiguration = JSON.stringify({'test':'test'});
  // const response = await utils.sendPostRequestStreaming(hostname, path, headers, data, sendEventStreamData); // 传递 sendEventStreamData 至 utils.sendPostRequest
  // // const response = await utils.sendPostRequest(hostname,path,headers,data);
  // console.log(`response:${response}`);
  // // const sql = `INSERT INTO promotion_solution (
  // //   session_id,
  // //   user_id,
  // //   promotion_configuration,
  // //   status
  // // ) VALUES (
  // //   '${sessionId}',
  // //   '${userId}',
  // //   '${promotionConfiguration}',
  // //   '${status}'
  // // );`;
  //   // 插入数据的示例
  // // const dataToInsert = {
  // //   sessionId: sessionId,
  // //   userId: userId,
  // //   promotionConfiguration: promotionConfiguration,
  // //   created_at: new Date()
  // // };

  // // const parameters = [dataToInsert.sessionId, dataToInsert.userId, dataToInsert.promotionConfiguration];
  // // utils.runSQL(constanst.mySQLConnectionConfig,sql,parameters);
  // const result = response;
  // return result;
// }

/**
 * 解释促销配置，将原来JSON配置解释成文本。
 * 场景：
 * 1.当AI生成初版促销配置后，用程序解释成人类（非技术人员）可以理解的促销说明（以便给到人类确认）。
 * 2.当人类确认初版促销配置，保存到数据库后，再一次解释该配置给人类知道。
 * 部署：本地服务器
 * 入参：促销配置（JSON）
 * 出参：促销说明（文本，str）
 * @param {*} config 
 */
function explainCore(config) {
  const conditionRelationship = config['detail']['conditionRelationship'];
  const conditions = config['detail']['conditions'];
  let conditionRelationshipStr = ''
  if(conditions.length==1){
    conditionRelationshipStr = '满足以下促销条件';
  }else{
    conditionRelationshipStr = conditionRelationship=='and'?'满足以下所有促销条件：':'满足以下任意一个促销条件：';
  }
  let conditionsStrAll = '';
  for(let i=0;i<conditions.length;i++){
    let conditionsStr = '';
    if(conditions[i]['type']=='系列商品数量满N个'){
      const conditionProducts = conditions[i]['products'];
      const quantity = conditions[i]['quantity'];
      conditionsStr = `购买任意以下商品${conditionProducts}满${quantity}件；`;
    }else if(conditions[i]['type']=='系列商品金额满N元'){
      const conditionProducts = conditions[i]['products'];
      const amount = conditions[i]['amount'];
      conditionsStr = `购买任意以下商品${conditionProducts}满${amount}元；`;
    }
    conditionsStrAll += conditionsStr;
  } 
  const presentGiftsType = config['detail']['gifts']['type'];
  const giftItems = config['detail']['gifts']['giftItems'];
  const presentGiftsTypeStr = presentGiftsType=='赠品都送'?'满足促销条件后，送出以下所有赠品':'满足促销条件后，顾客从多款赠品中选一款';
  let giftsStr = '';
  for(let i=0;i<giftItems.length;i++){
    giftsStr+= `${giftItems[i]['itemNumber']} x ${giftItems[i]['itemNumber']} 件;`;
  }
  
  const result = {
    '促销活动名称':config['promotionName'],
    '活动开始时间':config['startDate'],
    '活动结束时间':config['endDate']=='2099-12-31 23:59:59'?'暂未定':config['endDate'],
    '促销活动条件':`${conditionRelationshipStr} ${conditionsStrAll}`,
    '赠品送出规定':`${presentGiftsTypeStr} ${giftsStr}`,
  }
  return result;
}

// 核心逻辑函数
async function confirmPromotionCore(solutionId, sessionId, userId) {
  const status = '2';
  const sql = `update promotion_solution set status='${status}' where id='${solutionId}' and session_id='${sessionId}' and user_id='${userId}';`;
  const dataToUpdate = {
    sessionId: sessionId,
    userId: userId,
    status: status,
    solutionId: solutionId
  };
  const parameters = [dataToUpdate.status, dataToUpdate.solutionId, dataToUpdate.sessionId,dataToUpdate.userId];
  utils.runSQL(constanst.mySQLConnectionConfig,sql,parameters);
  const result = {
    'result':'success'
  };
  return result;
}

async function cancelPromotionCore(solutionId, sessionId, userId) {
  const status = '0';
  const sql = `update promotion_solution set status='${status}' where id='${solutionId}' and session_id='${sessionId}' and user_id='${userId}';`;
  const dataToUpdate = {
    sessionId: sessionId,
    userId: userId,
    status: status,
    solutionId: solutionId
  };
  const parameters = [dataToUpdate.status, dataToUpdate.solutionId, dataToUpdate.sessionId,dataToUpdate.userId];
  utils.runSQL(constanst.mySQLConnectionConfig,sql,parameters);
  const result = {
    'result':'success'
  };
  return result;
}
module.exports= {chatCore,explainCore,confirmPromotionCore,cancelPromotionCore};