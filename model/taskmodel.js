var mongoose = require('mongoose');

var taskshema = new mongoose.Schema({
    taskname:{
        type:String
    },
    startdate:{
        type:Date,
        default: Date.now
    },
    enddate:{
        type:String
    },
    status:{
        type:String,
        default:"pending"
    }
})
module.exports = mongoose.model('task',taskshema);