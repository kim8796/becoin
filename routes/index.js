var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var users = require('../models/users');
router.use(express.json());

/* GET home page. */


//Get All Users

router.get('/', function(req, res) {
  users.findAll().then((uids)=>{
	  if(!uids.length) return res.status(404).send({err:'user not found'});
	  res.send("find successfully : " + uids );
	  console.log(uids);
  })
  .catch(err=>res.status(500).send(err));
});

// Find One by uid 

router.get('/uid/:uid',(req,res) =>{
	users.findOneByUid(req.params.uid).then((uids)=>{
		if(!uids) return res.status(404).send({err:'user not found'});
		res.send('findOne successfully: ' + uids );
		console.log(uids);
	})
	.catch(err => res.status(500).send(err));
});

router.post('/',function(req,res){
	console.log(req.body);
	users.create(req.body)
		.then(user=>{
			console.log(user);
			res.send(user);
		})
		.catch(err=>res.status(500).send(err));
});


router.put('/uid/:uid',(req,res) =>{
	users.updateByUid(req.params.uid,req.body)
	.then(user => res.send(user))
	.catch(err => res.status(500).send(err));
});

router.delete('uid/:uid',(req,res) =>{
	user.deleteByUid(req.params.uid).then(()=>res.sendStatus(200))
	.catch(err => res.status(500).send(err));
});



module.exports = router;
