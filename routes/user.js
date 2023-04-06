var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require("../config")

/* GET users listing. */
router.post('/login', function(req, res, next) {
  const body = req.body;
  if(body.username=="admin" && body.password=="Password@123"){
    const token = jwt.sign({role:"administrator"},config.JWT_SECRET)
    return res.send({token:token})
  }
  if(body.username == "guest" && body.password == "Password@123"){
    const token = jwt.sign({role:"guest"},config.JWT_SECRET)
    return res.send({token:token})
  }
  return res.status(422).send({message:"unauthorized access"})
});

module.exports = router;
