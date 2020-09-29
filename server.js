/*********************************************************************************
* WEB422 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Kursad Caliskan     Student ID: 136955184    Date: Sep 29, 2020
* Heroku Link:
*
********************************************************************************/ 

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dataService = require("./modules/data-service.js");

const myData = dataService("mongodb+srv://kursadman:!A123s123@cluster0.eaxud.azure.mongodb.net/sample_supplies?retryWrites=true&w=majority");

const app = express();

app.use(cors());

app.use(bodyParser.json());

const HTTP_PORT = process.env.PORT || 8080;

// ************* API Routes

// POST /api/sales (NOTE: This route must read the contents of the request body)
app.post("/api/sales", (req,res)=>{
    let newSale = req.body;
    
    myData.addNewSale(newSale)
    .then(Msg => res.json({"message": Msg}))
    .catch(err => res.json({"message": err}));

});

// GET /api/sales (NOTE: This route must accept the numeric query parameters "page" and "perPage", ie: /api/sales?page=1&perPage=5 )
app.get("/api/sales", (req,res)=>{
    let page = req.query.page;
    let perPage = req.query.perPage;
   
    myData.getAllSales(page, perPage)
    .then(sales => res.json(sales))
    .catch(err => res.json({"message": err}));    
});

// GET /api/sales (NOTE: This route must accept a numeric route parameter, ie: /api/sales/5bd761dcae323e45a93ccfe8)
app.get("/api/sales/:id", (req,res)=>{
    let id = req.params.id;
    
    myData.getSaleById(id)
    .then(sale => res.json(sale))
    .catch(err => res.json({"message": err}));
});


// PUT /api/sales (NOTE: This route must accept a numeric route parameter, ie: /api/sales/5bd761dcae323e45a93ccfe8 as well as read the contents of the request body)
app.put("/api/sales/:id", (req,res)=>{
    let id = req.params.id;
    let updatedSale = req.body;
    
    myData.updateSaleById(updatedSale, id)
    .then(Msg => res.json({"message": Msg}))
    .catch(err => res.json({"message": err}));
});


// DELETE /api/sales (NOTE: This route must accept a numeric route parameter, ie: /api/sales/5bd761dcae323e45a93ccfe8)
app.delete("/api/sales/:id", (req,res)=>{
    let id = req.params.id;    
   
    myData.deleteSaleById(id)
    .then(Msg => res.json({"message": Msg}))
    .catch(err => res.json({"message": err}));
});

// ************* Initialize the Service & Start the Server

myData.initialize().then(()=>{
    app.listen(HTTP_PORT,()=>{
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err)=>{
    console.log(err);
});

