var express = require('express');
var router = express.Router();
var fs = require('fs');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/upload', function(req, res) {

if(!req.files || !req.files.myFile) {
    return res.status(400).send('Bad Request: no uploaded file found.');
  }

  res.status(200).send('Done! File uploaded to: ' + req.files.myFile.path);

});
module.exports = router;
