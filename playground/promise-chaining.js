require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('5e9bb92c766bae0e8012a9fe',{age: 1}).then((user) => {
//     console.log(user)
//     return User.countDocuments({age: 1})
// }).then((count) => {
//     console.log(count)
//     return User.create({name: 'Mai',age: 30,email:'mai@email.com',password:'pwdmai112'})
// }).then((maiUser) => {
//     console.log(maiUser)
// }).catch((e)=>{
//     console.log(e)
// })


const kayUser = User({name: 'rachid',age: 31,email: 'rachidlo@email.com',password: 'aa2232233'})
const UpdateCountAddFunction = async (id,age,kayUserArg) => {
    const user = await User.findByIdAndUpdate(id,{age})
    console.log(user)
    const count = await User.countDocuments({age})
    console.log(count)
    const kayUser = await User.create(kayUserArg)
    return kayUser
}


UpdateCountAddFunction('5e9bb92c766bae0e8012a9fe',30,kayUser).then((finalKayUser) => {
    console.log(finalKayUser)
}).catch((e) => {
    console.log(e)
})