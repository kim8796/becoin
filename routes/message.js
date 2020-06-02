var express = require('express');
var router = express.Router();
var amqp = require('amqplib/callback_api');

router.use(express.json());

router.post('/send/',function(req,res){
        //var type = req.body.type;
        //var message = req.body.message;
        //console.log('type :' + type + '\nmessage : ' + message);
        var body = req.body;
        console.log(req.body);
        amqp.connect('amqp://test:test@localhost:5672',function(err,conn){
                if(err){
			console.error("[AMQP]" + err.message);
                        throw err;
                }
                conn.createChannel(function(err1,ch){
                        if(err1){
                                throw err1;
                        }
                        var type = req.body.type;
                        if (type = "message"){
                                var msg = req.body.message;
                                var queue = req.body.queue;
                                ch.assertQueue(queue,{
                                        durable : false
                                });
                                ch.sendToQueue(queue,Buffer.from(msg));
                                console.log(" [x] Sent %s",msg);
                        }



                });
                setTimeout(function(){
                        conn.close();
                },500);
	});

});


module.exports = router;

