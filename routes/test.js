var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('test', { title: '提交表单及接收参数示例' });
});
module.exports = router;
