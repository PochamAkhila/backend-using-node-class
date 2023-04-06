var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'I am working as a software engineer trainee at motivity labs' });
});

module.exports = router;
