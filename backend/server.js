const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/shecanDB")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

const contactSchema=new mongoose.Schema({
    name:String,
    emial:String,
    message:String
})

const Contact =mongoose.model("Contact",contactSchema);

app.post('/submit',async(req,res)=>{
    try{
        const newContact=new Contact(req.body);
            await newContact.save();
            res.status(200).json({message:"Contact saved successfully"})
    }catch(err){
        res.status(500).json({message:"Error saving contact",error:err.message})
    }
})

app.listen(5000,()=>{
    console.log("server runing on port 5000")
})