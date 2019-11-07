const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
// 模拟数据，api服务
var mysql = require('mysql');
var mysqlConf = require('./db');
// var sqlMap = require('./sqlMapping');

var appData = require('./data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;


// 连接数据库
var connection = mysql.createConnection({
  host: mysqlConf.mysql.host,
  user: mysqlConf.mysql.user,
  password: mysqlConf.mysql.password,
  database: mysqlConf.mysql.database,
  port: mysqlConf.mysql.port
})
connection.connect(function(){
    console.log('数据库连接成功！');
});
// api接口
var apiRoutes = express.Router();
apiRoutes.get('/seller', function(req, res) {
  res.json({
    erron: 0,
    data: seller
  })
});

apiRoutes.get('/goods', function(req, res) {
  	var sql = 'SELECT * FROM `FOODS`'
	connection.query(sql, (err, result) => {
      console.log(result);
 	 	res.json({
    		erron: 0,
   			data: result
 		})
    });
});

apiRoutes.get('/ratings', function(req, res) {
  res.json({
    erron: 0,
    data: ratings
  })
});
app.use('/api', apiRoutes);
app.use(express.static(path.resolve(__dirname, '/')))

app.get('*', function(req, res) {
  const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf-8')
  res.send(html)
})
app.listen(8081);
