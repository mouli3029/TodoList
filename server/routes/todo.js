const express = require('express');
const Todo = require('../models/todo');
const TodoRouter = express.Router();

TodoRouter.get('/todos', async(req, res) => {
    await Todo.find({})
    .then(data => {
        res.status(200).json(data)
    })
    .catch(err => {
        console.log(err);
        res.status(500).send(err)
    })
})

TodoRouter.post('/todos', async (req, res) => {
    const body = req.body;
    if(!body){
        return res.status(400).end()
    }
    const todo = new Todo(body);
    await todo.save()
        .then((data) =>{
            res.status(201).json(data)
        })
        .catch((err) => {
            res.status(500).send(err);
        })
})

TodoRouter.get('/todos/:id', async (req,res)=>{
    await Todo.findById(req.params.id)
    .then(todo => {
        res.status(200).json(todo)
    })
    .catch((err)=>{
        res.status(400).send(err);
    })
})

TodoRouter.put('/todos/:id',async (req,res)=>{
    const body = req.body;
    if(!body){
        return res.status(400).end()
    }
   await Todo.findByIdAndUpdate(req.params.id,body,{new : true})
    .then(todo => {
        res.status(201).json(todo)
    })
    .catch(err => {
        res.status(400).send(err);
    })
})
TodoRouter.delete('/todos/:id',async (req,res)=>{
    await Todo.findByIdAndRemove(req.params.id)
    .then(todo => {
        res.status(200).json(todo)
    })
    .catch(err => {
        res.status(400).send(err);
    })
})


//mongodb+srv://todo:mouli1234@cluster0.96osm.mongodb.net/test

module.exports = TodoRouter