var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
	u_id:{type : String, required : true, unique : true},
	u_name:{type : String, required : true},
	u_description:String,
	u_pic:[Object],
	u_email:String,
	u_phone:String,
	u_location:{
		type:{
			type:String,
			enum:['Point']
		},
		coordinates:[Number]
	}		
	//u_location:{type:[Number],index:{type:'2dsphere',sparse:true}}
	});

usersSchema.static.create = function(payload){
	const us = new this(payload);
	return us.save();
};

usersSchema.statics.findAll = function(){

	return this.find({});
};

usersSchema.statics.findOneByUid = function(uid){
	return this.findOne().where('u_id').equals(uid);
};


usersSchema.statics.updateByUid = function(u_id,payload){
	return this.findOneAndUpdate({u_id},payload,{new:true});
};
usersSchema.statics.deleteByUid = function(u_id){
	return this.remove({u_id});
};


module.exports = mongoose.model('users',usersSchema);



