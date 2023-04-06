var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.post('/login', function(req, res, next) {
  const body = req.body;
  if(body.username=="admin" && body.password=="Password@123"){
    const token = jwt.sign({role:"administrator"},"secret")
    return res.send({token:token})
  }
  if(body.username == "guest" && body.password == "Password@123"){
    const token = jwt.sign({role:"guest"},"secret")
    return res.send({token:token})
  }
  return res.status(422).send({message:"unauthorized access"})
});

module.exports = router;
