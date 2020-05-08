var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var users = require('../models/users');


/* GET home page. */

//Get All Users

router.get('/', function(req, res, next) {
  users.find(function(err,user){
	  if(err) return next(err);
	  res.json(user);
  });
});




module.exports = router;
