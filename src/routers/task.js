const express = require('express')
const router = new express.Router()
const Task = require('../models/task')
const auth = require('../middleware/auth')


router.post('/tasks',auth,(req,res) => {
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    task.save().then(()=>{
        res.status(201).send(task)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

router.get('/tasks',auth, async (req,res) => {
    try {
        // const tasks = await Task.findOne({owner: req.user._id})
        // if(!tasks){
        //     return res.status(404).send()
        // }
        // const tasks = await Task.findOne({owner: req.user._id})
        // console.log('FIND BY ONE: ',tasks)
        const match = {}
        debugger
        if(req.query.completed){
            match.completed = req.query.completed
        }
        await req.user.populate({
            path:'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.limit) * (parseInt(req.query.page) - 1)
            }
        }).execPopulate()
        
        res.send(req.user.tasks)
        // res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/tasks/:id',auth,async (req,res) => {
    const _id = req.params.id
    console.log('TASK ID',_id)
    try {
        const task = await Task.findOne({_id ,owner: req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})
module.exports = router