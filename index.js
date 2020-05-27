const express = require('express')
const path = require('path')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multiparty = require('connect-multiparty');
var userRouter = require('./routes/index');


app.set('port',(process.env.PORT||3000));

app.use(express.static(__dirname+'/public'));

app.use(multiparty());

app.use('/users',userRouter);


//mongoose CONFIGURE APP TO USE bodyParser
//app.use(bodyParser.urlencoded({extended : true}));
//app.use(bodyParser.json());

app.use(express.json());


var db = mongoose.connection;
db.on('error', console.error);
db.once('open',function(){
	//CONNECTED TO MONGODB SERVER
 console.log("Connected to mongodb server");
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://kim8796@localhost:27017/becoin',{
	'auth':{ 'authSource' : 'admin' },
	'user':'appuser1',
	'pass':'appuser1',
	'useNewUrlParser':true})
 .then(() => console.log('connected succesful'))
 .catch((err) => console.error(err));

	
//
//
//

// Model 

var Users = require('./models/users');


//views is directory for all template files

app.set('views',__dirname+'/views');
app.set('view engine','ejs');

//var server = app.listen(3000,()=>{
//	console.log('listening at port 3000')
//})


//var sio = io.listen(server)


//서버 연결하기 직전에 뜨는 부분 

console.log("outside io");

io.on('connection',function(socket){

	//로그인 하면 이거 밑에 두개뜸
	console.log('User Connection');

	socket.on('connect user', function(user){
		console.log("coneected user ");
		socket.join(user['roomName']);
		console.log("roomName : ",user['roomName']);
		console.log("state:",socket.adapter.rooms);
		io.emit('connect user',user);
	});

	//메세지 입력하면 서버 로그에 이거뜸
	socket.on('chat message', function(msg){
		console.log("Message " + msg['script']);
		console.log("보내는 아이디: ",msg['roomName']);
		io.to(msg['roomName']).emit('chat message',msg);
	});
});

//맨 처음에 서버 연결하면 몇번 포트에 서버 연결되어 있는지 알려주는부분

http.listen(app.get('port'),function(){
	console.log('Node app is running on port', app.get('port'));
});

app.listen(80,function(){
	console.log('http listhen 80');
});
