const express = require('express');
const db = require('./data/dbConfig');
const router = express.Router();


router.get("/", async (req, res)=>{
    try{
        const accounts = await db('accounts');
        res.status(200).json(accounts);
    }
    catch({message}){
        res.status(500).json({success: false, message});
    }
});

router.get("/:id", async (req, res) => {
        const {id} = req.params;
    try{
        const account = await db('accounts').where({id});
        res.status(200).json(account);
    }
    catch({message}){
        res.status(500).json({success: false, message});
    }
});

router.post('/', async (req, res) => {    
    const accountData = req.body;
    try{
        const count = await db('accounts').insert(accountData);
        if(count){
            res.status(201).json(`${count} record was added to the database.`);
        }else{
            res.status(400).json({success:false,message:"There was an error adding the data."});
        }
    }
    catch({message}){
        res.status(500).json({success: false, message});
    }

});

router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const accountUpdateData = req.body;

    try{
        const count = await db('accounts').where({id}).update(accountUpdateData);
        res.status(200).json(`${count} record was updated to the database.`);
    }
    catch({message}){
        res.status(500).json({succes:false, message});
    }
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;

    try{
        const deleted = await db('accounts').where({id}).del();
        res.status(200).json({message: `The account with the id ${id} has been deleted.`});
    }
    catch({message}){
        res.status(500).json({succes:false, message});
    }
});



module.exports = router;


