var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/api/users',function(req,res){
  res.end();
});
router.get('/api/users/:uid',function(req,res){
  res.end();
});
router.get('/api/users/:uname',function(req,res){
  res.end();
});
router.get('/api/users/:uage',function(req,res){
  res.end();
});
router.get('/api/users/:ulocation',function(req,res){
  res.end();
});
router.get('/api/users/:udescription',function(req,res){
  res.end();
});
router.get('/api/users/:uphoto',function(req,res){
  res.end();
});
router.get('/api/users/:gender',function(req,res){
  res.end();
});
router.post('/api/users/:uid',function(req,res){
  res.end();
});
router.post('/api/users/:uname',function(req,res){
  res.end();
});
router.post('/api/users/:uage',function(req,res){
  res.end();
});
router.post('/api/users/:ulocation',function(req,res){
  res.end();
});
router.post('/api/users/:udescription',function(req,res){
  res.end();
});
router.post('/api/users/:uphoto',function(req,res){
  res.end();
});
router.post('/api/users/:gender',function(req,res){
  res.end();
});


module.exports = router;
