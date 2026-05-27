const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv=require("dotenv");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

const contactSchema=new mongoose.Schema({
    name:String,
    email:String,
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

// https://shecan-backend-94tv.onrender.com