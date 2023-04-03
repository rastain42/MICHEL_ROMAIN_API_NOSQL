const {Schema, model} = require('../../database');

const userSchema = new Schema({
    email : {type : String, required : true, unique : true},
    password : {type : String, required: true}
});

const User = model('User', userSchema);

module.exports = User;