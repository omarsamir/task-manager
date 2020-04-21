const mongoose = require('mongoose')
const Task = mongoose.model('Task',{
    descrption: {
        type: String
    },
    completed:{
        type: Boolean
    }   
})

module.exports = Task