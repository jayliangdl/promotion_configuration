const https = require('https');
const mysql = require('mysql2');

// const sendPostRequest=function(hostname,path,headers,data){
//   return new Promise((resolve, reject) => {
//     const options = {
//       hostname: hostname,
//       path: path,
//       method: 'POST',
//       headers: headers
//     };

//     const req = https.request(options, res => {
//       let body = '';
//       res.on('data', chunk => body += chunk);
//       res.on('end', () => {
//         if (res.statusCode === 200) {
//           const response = JSON.parse(body);
//           resolve(response);
//         } else {
//           reject(new Error('Failed to fetch file info'));
//         }
//       });
//     });

//     req.on('error', error => reject(error));
//     req.write(data);
//     req.end();
//   });
// }


const sendPostRequest = function(hostname, path, headers, data) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: hostname,
      path: path,
      method: 'POST',
      headers: headers
    };

    const chunks = [];
    const req = https.request(options, res => {
      res.on('data', chunk => chunks.push(chunk)); // 收集数据片段
      res.on('end', () => {
        const body = Buffer.concat(chunks).toString(); // 合并所有数据片段
        try {
          console.log(`body:${body}`);
          const response = JSON.parse(body);
          if (res.statusCode === 200) {
            resolve(response);
          } else {
            reject(new Error('Failed to fetch file info with status code ' + res.statusCode));
          }
        } catch (jsonParseError) {
          reject(jsonParseError);
        }
      });
    });

    req.on('error', error => reject(error));
    req.write(data);
    req.end();
  });
};


const sendPostRequestStreaming = function(hostname, path, headers, data,sendEventStreamData) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: hostname,
      path: path,
      method: 'POST',
      headers: headers
    };

    const req = https.request(options, res => {
      res.on('data', chunk => {
        const piece = chunk.toString();
        console.log(`piece:${piece}`);
        sendEventStreamData(piece); // 直接将收到的数据片段发送到前端
      });
      res.on('end', () => {
        resolve();
      });
    });

    req.on('error', error => reject(error));
    req.write(data);
    req.end();
  });
};


const runSQL = function(connectionConfig,sql,parameters){
  // 导入mysql2模块


// 创建数据库连接配置
// const connectionConfig = {
//   host: 'localhost', // 替换为您的MySQL服务器地址
//   user: 'your_username', // 替换为您的MySQL用户名
//   password: 'your_password', // 替换为您的MySQL密码
//   database: 'your_database' // 替换为您的数据库名
// };

// 创建数据库连接
const connection = mysql.createConnection(connectionConfig);

// 连接数据库
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database.');

  // 插入数据的示例
  // const dataToInsert = {
  //   title: 'Example Title',
  //   content: 'This is an example content.',
  //   created_at: new Date()
  // };

  // 编写SQL插入语句
  // const sql = `INSERT INTO your_table_name (title, content, created_at) VALUES (?, ?, ?)`;
  // const parameters = [dataToInsert.title, dataToInsert.content, dataToInsert.created_at];
  // 执行SQL查询
  console.log(`sql:${sql}`);
  console.log(`parameters:${JSON.stringify(parameters)}`);
  connection.query(sql, parameters, (error, results, fields) => {
    if (error) {
      console.error('Error inserting record:', error);
    } else {
      console.log('Inserted record ID:', results.insertId);
    }

    // 关闭数据库连接
    connection.end((err) => {
      if (err) {
        console.error('Error closing connection:', err);
      } else {
        console.log('Connection closed successfully.');
      }
    });
  });
});
}


module.exports = {
  sendPostRequest,runSQL,sendPostRequestStreaming
};