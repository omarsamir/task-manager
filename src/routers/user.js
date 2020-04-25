const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
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
        res.status(400).send('Error login' + e)
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


router.patch('/users/me',auth, async(req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation){
        return res.status(400).send({error: 'INVALID UPDATES YA 7ABIBI'})
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me',auth, async (req,res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})

const upload = multer ({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined,true)
    }
})
router.post('/users/me/avatar',auth,upload.single('avatar'), async(req,res) => {
   const buffer = await sharp(req.file.buffer).resize({width: 256,height:256}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send(req.user.name)
},(error,req,res,next) => {
    res.status(400).send({error: error.message})
})

router.delete('/users/me/avatar',auth,async (req,res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar',async (req,res) => {
    try {
        
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error()
        }

        res.set('Content-Type','image/jpg')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
})
module.exports = router