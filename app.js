const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const Product = require('./models/product');

mongoose.connect("mongodb+srv://owner:owner123@cluster0.lnfnycs.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true, useUnifiedTopology: true
})
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.get('/api/', (req, res, next) => {
    res.status(200).json({message: 'bienvenue dans l\'api'})
});

/*
*GET: /api/products
* */
app.get('/api/products', (req, res) => {
    Product
        .find()
        .then(products => res.status(200).json({products}))
        .catch(error => res.status(400).json({error}));
});

/*
*GET: /api/products/:id
* */
app.get('/api/products/:id', (req, res) => {
    Product
        .findOne({_id: req.params.id})
        .then(product => res.status(200).json({product}))
        .catch(error => res.status(400).json({error}));
});

/*
*POST: /api/products/
* */
app.post('/api/products',(req,res,next)=>{
    delete res.body._id;
    const product=new Product(...req.body);
    product
        .save()
        .then(product=>res.statut(201).json({product}))
        .catch(error=>res.statut(201).json({error}));

    next();

});


/*
*PUT: /api/products/:id
* */
app.put('/api/products/:id',(req, res)=>{
    Product
        .updateOne({_id:req.params.id},{...req.body, _id: req.params.id})
        .then(()=>res.statut(200).json({message:'Modified!'}))
        .catch(error=>res.statut(400).json({error}));
});

/*
*DELETE: /api/products/:id
* */
app.delete('/api/products/:id',(req,res)=>{
    Product
        .deleteOne({_id:res.params.id})
        .then(()=>{res.status(200).json({message:'Deleted!'})})
        .catch(error=>res.status(200).json({error}));
});

module.exports = app;