const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
// router.post('/users',(req,res) => {
//     const user = new User(req.body)
//     user.save().then(() => {
//         res.send(user)
//     }).catch((error) => {
//         res.send(error)
//     })
// })

router.post('/users', async (req,res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/login', async (req,res) => {
    try {
        const user = await User.findbyCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})
    } catch (e) {
        res.send('Error login' + e)
    }
})

router.post('/users/logout',auth,async (req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter ((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})


router.post('/users/logoutAll',auth,async (req,res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})


// auth is middleware
router.get('/users/me',auth,(req,res) => {
    res.send(req.user)
    // User.find({}).then((user) => {
    //     res.send(user)
    // }).catch((e)=>{
    //     res.status(500).send(e)
    // })
})

router.get('/users/:id',(req,res) => {

   const _id = req.params.id 
   User.findById(_id).then((user) => {
       debugger
       if (!user) {
       return  res.status(404).send()
       }
        res.send(user)
   }).catch((e)=>{
    res.status(500).send()
   })
   console.log(req.params)
})


router.patch('/users/:id', async(req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation){
        return res.status(400).send({error: 'INVALID UPDATES YA 7ABIBI'})
    }

    try {


        const user = await User.findById(req.params.id)

        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        // const user = await User.findByIdAndUpdate(req.params.id,req.body, {new: true,runValidators: true})

        if (!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})


module.exports = router