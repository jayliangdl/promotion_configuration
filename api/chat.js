const {chatCore,explainCore,confirmPromotionCore} = require('../core/chatCore');
const config_demo = {
  'promotionName':'xxx',
  'startDate':'2024-04-15 10:00:00',
  'endDate':'2099-12-31 23:59:59',
  'creatorHuman':'xxxx',
  'lastModifiedHuman':'xxxxx',
  'detail':{
    'conditionRelationship':'and',
    'conditions':[
      {
        'type':'系列商品数量满N个',
        'products':['10001','10002','10003','10004','10005'],
        'quantity':1
      },
      {
        'type':'系列商品金额满N元',
        'products':['10001','10002','10003','10004','10005'],
        'amount':1000.00
      }
    ],
    'gifts':{
      'type':'赠品都送',
      'giftItems':[
        {
          'itemNumber':'20001',
          'quantity':1
        },
        {
          'itemNumber':'20002',
          'quantity':1
        }
      ]
    }
  }
};
// const chat = async (req, res) => {
//   const { humanMessage, sessionId, userId } = req.body;
//   try {
//     const result = await chatCore(humanMessage, sessionId, userId);
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };

const chat = async (req, res) => {
  const { humanMessage, sessionId, userId } = req.body;

  // 设置头部，告诉客户端这是一个事件流
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });

  const sendEventStreamData = (data) => {
    res.write(`${data}||`);
  }

  try {
    await chatCore(humanMessage, sessionId, userId, sendEventStreamData);
    res.end(); // 关闭连接
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const explain = async(req, res) =>{
  try {
    const result = await explainCore(config_demo);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

const confirmPromotion = async(req, res) =>{
  try {
    const { solutionId, sessionId, userId } = req.body;
    const result = await confirmPromotionCore(solutionId, sessionId, userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
module.exports = {chat,explain,confirmPromotion};
