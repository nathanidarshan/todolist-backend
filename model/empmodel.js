var mongoose = require('mongoose');

var empshema = new mongoose.Schema({
    name:{
        type:String
    },
    task_id:{
        type: mongoose.Schema.Types.String,
        ref:"task",
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
})
module.exports = mongoose.model('employee',empshema);