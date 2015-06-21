var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('access', { title: '提交表单及接收参数示例' });
});

router.post('/',function(req, res){
  var 
  userName = req.body.txtUserName,
  userPwd = req.body.txtUserPwd,
  userName2 = req.param('txtUserName'),
  userPwd2 = req.param('txtUserPwd');

  console.log('req.body:'+userName);
  console.log('req.body:'+userPwd);

  if(userName == "ou9s9a9l" && userPwd == "032329")
　res.render('subform', { title: '提交表单及接收参数示例' });
else res.render('access', { title: '提交表单及接收参数示例' });

});
module.exports = router;


