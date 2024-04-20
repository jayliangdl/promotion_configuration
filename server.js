const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const port = 3000;

// 导入你的模块
const chat = require('./api/chat');
const workflow = require('./api/workflow');
const hello = require('./api/hello');

// 使Express能够解析JSON请求体
app.use(express.json());
// 定义一个路由来处理POST请求
app.post('/chat', chat.chat);
app.post('/explain', chat.explain);
app.post('/confirmPromotion', chat.confirmPromotion);
app.post('/wf-conditions', workflow.conditions);
app.post('/hello', hello);



app.post('/chatstream', (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // 获取前端发送的数据
  const { humanMessage, sessionId, userId } = req.body;
  console.log('Received message:', humanMessage);

  let count = 0;
  const total = 100; // 总字数
  const intervalTime = 200; // 每200毫秒发送一次数据
  const charsPerInterval = 5; // 每次发送5个字

  const intervalId = setInterval(() => {
      if (count < total) {
          const nextChunk = '哈'.repeat(Math.min(charsPerInterval, total - count));
          res.write(nextChunk);
          count += charsPerInterval;
      } else {
          clearInterval(intervalId);
          res.end();
      }
  }, intervalTime);
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
