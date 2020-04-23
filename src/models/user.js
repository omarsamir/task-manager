const mongoose = require('mongoose')
const validator  = require('validator')
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
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
        unique: true,
        required: true, 
        // index: true,
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

// userSchema.index({email: 1 }, { unique: true});
userSchema.statics.findbyCredentials = async (email, password) => {
    const user = await User.findOne({email})

    if (!user) {
        throw new Error('Uanbale to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch){
        throw new Error('Unable to login')
    }

    return user
}

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    console.log('Just before saving')
    next()
})
const User = mongoose.model('User',userSchema)

module.exports = User