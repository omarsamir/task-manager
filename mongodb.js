// CRUD

// const {MongoClient, ObjectID} =  require('mongodb')
// const connectionURL = 'mongodb://127.0.0.1:27017'
// const databaseName = 'task-manager'

// const id = new ObjectID() 
// console.log(id.id.length)
// // console.log(id.getTimestamp())
// console.log(id.toHexString().length)
// MongoClient.connect(connectionURL,{useNewUrlParser: true}, (error,client) => {
//     if (error) {
//         console.log('Ubable to connect to database!')
//     }

//     const db = client.db(databaseName)
    // db.collection('users').insertOne({
    //     name: 'Omar',
    //     age: 28 
    // },(error,result) => {
    //     if (error){
    //         return console.log('Unable to insert user')
    //     }

    //     console.log(result.ops)
    // })
    // console.log('Connected correctly!')

    // db.collection('users').insertMany([
    //     {
    //         name: 'jen',
    //         age: 22
    //     },
    //     {
    //         name: 'mary',
    //         age: 15
    //     }
    // ],(error,result) => {
    //     if(error){
    //         return console.log('Unable to insert documents!')
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: "desc 1",
    //         completion: true
    //     },
    //     {
    //         description: "desc 2",
    //         completion: false
    //     },
    //     {
    //         description: "desc 3",
    //         completion: true
    //     }
    // ])

    // db.collection('users').find({age: 28},(error,result)=>{
    //     console.log(result)
    // })

    // db.collection('users').find({age: 28}).toArray((error,result)=>{
    //     console.log(result)
    // })

    // const updatePromise = db.collection('users').updateOne({
    //     _id: ObjectID('5e9461ef547c0f40b82bdf25')
    // },{
    //     // $set: {
    //     //     name: 'POP'
    //     // }
    //     $inc:{
    //         age: 1
    //     }
    // })

    // updatePromise.then((result) => {
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    // db.collection('tasks').updateMany({
    //     completion: true
    // },{
    //     $set: {
    //         completion: false
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('tasks').deleteOne({
    //     _id: ObjectID("5e946f53644b3a4f685afa8f")      
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })
// })