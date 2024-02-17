const express = require('express');
const app = express();
const Product = require('./models/Productmodel')
const mongoose =require('mongoose');

app.use(express.json())
app.get('/', (req, res)=>{
    res.send("hey i am running on port 3000")
})

app.get('/blog', (req, res) =>{
    res.send('this is blog route');
})

app.post('/product', async (req,res)=>{
    try{

        const product = await Product.create(req.body);
        res.status(200).json(product)
        console.log(req.body);
    }catch(error){
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
    
})


app.get('/product', async (req,res)=>{
    try {
        const product = await Product.find({});
        res.status(200).json(product)
        
        } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

app.get('/product/:id', async(req,res)=>{
    try {
        const {id } =req.params
        const product = await Product.findById(id)
        res.status(200).json(product)


    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
})

app.put('/product/:id', async(req,res)=>{
    try {
        const {id } = req.params
        const product = await Product.findByIdAndUpdate(id, req.body)  
        if(!product){
            return res.status(404).json({message: `can not fond this product in DB for this ${id}`})
        }
        const updatedproducts = await Product.findById(id);
        res.status(200).json(updatedproducts)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.delete('/product/:id', async(req,res)=>{

    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id)
        if(!product){
            return res.status(404).json({message: `The Object is not in Databse for this ${id}`})
        }
        res.status(200).json(product);
    
    } catch (error) {
        res.status(500).json({message: error.message})

    }
   
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

