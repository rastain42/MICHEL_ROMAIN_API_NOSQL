const {Schema, model} = require('../../database');

const choiceSchema = new Schema({
    id : {type : String, required : true, unique : true},
    date : {type : String, required: true}
    date : {type : String, required: true}

});

const User = model('User', userSchema);

module.exports = User;