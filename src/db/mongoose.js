const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-db',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    autoIndex: true
}).then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
})
