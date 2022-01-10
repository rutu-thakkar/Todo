const express = require('express');
const router = express.Router();
const db = require('../models');

//get all todos
router.get('/all', (req,res) => {
    db.todo.findAll().then((todos) => {
        res.send(todos)
    })
});

//add new
router.post('/new', (req,res) => {
    db.todo.create({
        text: req.body.text
    }).then((data) => {
        res.send(data)
    })
});

//get specific
router.get('/find/:id', (req,res) => {
    db.todo.findAll({
        where: {id : req.params.id} 
    }).then((data) => {
        if (!data) {
            return res.send("No Data found")
        } 
        res.send(data)
    })
});

//delete
router.delete('/delete/:id', (req,res) =>{
    db.todo.destroy({
        where : {
            id : req.params.id
        }
    }).then((data) => {
        res.send('deleted!');
    });
});

//edit todo by id in url
router.put('/edit/:id', (req,res) => {
    db.todo.update({
        text: req.body.text
    },{
        where: { id : req.params.id }
    }).then((data) => {
        res.send(data + " updated");
    });
})

//edit todo by providing id from body
router.put('/edit', (req,res) => {
    if (!req.body) {
        res.send("empty body")
    } else {
        db.todo.update({
            text: req.body.text
        },{
            where : { id : req.body.id }
        }).then((data) => {
            if(!data) {
               return res.send('not found')
            }
            res.send(data + " updated")
        });
    }
})


module.exports = router;