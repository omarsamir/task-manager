const express = require('express')
const router = new express.Router()
const Task = require('../models/task')


router.post('/tasks',(req,res) => {
    const task = new Task(req.body)
    task.save().then(()=>{
        res.status(201).send(task)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

router.get('/tasks',(req,res) => {
    res.send('LIST TASKS')
})

module.exports = router