const express = require('express')
const router = new express.Router()
const User = require('../models/user')
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
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/users',(req,res) => {
    User.find({}).then((user) => {
        res.send(user)
    }).catch((e)=>{
        res.status(500).send(e)
    })
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
debugger
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation){
        return res.status(400).send({error: 'INVALID UPDATES YA 7ABIBI'})
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id,req.body, {new: true,runValidators: true})

        if (!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})


module.exports = router