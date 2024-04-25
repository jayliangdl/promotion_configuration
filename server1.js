const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const port = 3000;

// 导入你的模块
const hello = require('./api/hello');

// 使Express能够解析JSON请求体
app.use(express.json());
// 定义一个路由来处理POST请求

app.post('/hello', hello);


// 启动服务器
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
