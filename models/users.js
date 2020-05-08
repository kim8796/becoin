var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
	u_id:{type : String, required : true},
	u_Name:{type : String, required: true},
});

module.exports = mongoose.model('users',usersSchema);



