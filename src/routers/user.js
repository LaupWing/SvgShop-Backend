const express = require('express')
const router = new express.Router()
const User = require('../models/user')
router
    .get('/user/me', (req,res)=>{
        res.send('users me')
    })
    .post('/users/login', (req,res)=>{
        res.send('login page')
    })
    .post('/user', async (req,res)=>{
        const user = new User(req.body)
        try{
            await user.save()  
            res.status(201).send(user) 

        }catch(e){
            res.status(400).send(e)
        }
    })


module.exports = router