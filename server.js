const express = require("express");
const app = express();
require('dotenv').config({path:'./config/.env'});
const mongoose = require("mongoose");
const User = require("./models/User.js");
const bodyParser = require("body-parser");




// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())



// connexion à la base de données---------------------------------------
mongoose.connect("mongodb+srv://mozart:mozart225@cluster0.9djoc.mongodb.net/rest_api?retryWrites=true&w=majority")
.then(()=>console.log("db connecté"))
.catch(err => console.log(err))


//routes--------------------------------------------------------
app.post("/",async (req,res,next)=>{
    const newUser = new User(req.body);
    try{
        await newUser.save();
        res.status(201).json({message: "succès"})
    }catch(error){
        res.status(500).send(error);
    }
});

app.get("/",async (req,res,next)=>{
    try{
        const users = await  User.find({});
        res.status(201).send(users);
    }catch(error){
        res.status(500).send(error);
    }
});
app.put("/:id",async (req,res,next)=>{
    try{
        const updateUser = await User.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body}
        );
        if(!updateUser){
            res.status(404).send("non trouvé");
        }
        res.status(201).json({message: "modifaction effectué succès"});

    }catch(error){
        res.status(500).send(error);
    }
});
app.delete("/:id",async (req,res,next)=>{
    try{await User.findOneAndDelete({_id:req.params.id})
    res.status(201).json({message:"suppression effectué succès"});}
    catch(error){ 
        res.status(500).send(error);
    }
});


// exécuter le serveur-----------------------------------------------
const port = 4000;
app.listen(port,()=>console.log("SERVEUR EXÉCUTÉ DANS LE PORT ",port));