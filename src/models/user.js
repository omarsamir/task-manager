const mongoose = require('mongoose')
const validator  = require('validator')
const User = mongoose.model('User',{
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        },
      default: 0
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)){
                throw new Error('This is not a valid email')
            }
        },
        trim: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 7,
        validate(value){
            if (value.toLowerCase().includes('password')){
                    throw new Error('Password should not contains word password!')
            }
        }
    }
})

module.exports = User