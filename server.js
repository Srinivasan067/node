const express = require('express');
const app = express();
const mongoose =require('mongoose');

app.get('/', (req, res)=>{
    res.send("hey i am running on port 3000")
})

app.get('/blog', (req, res) =>{
    res.send('this is blog route');
})



mongoose.set('strictQuery', false)

mongoose.connect('mongodb+srv://test:test123@cluster0.ixharx9.mongodb.net/Node?retryWrites=true&w=majority')
.then(()=>{
    console.log('connected to mongodb');
    app.listen(3000, ()=> {
        console.log("server is running in port 3000");
    })

    
}).catch((error)=>{
    console.log(error)
})

