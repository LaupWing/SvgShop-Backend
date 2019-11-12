const express = require('express')
const router = new express.Router()
const User = require('../models/user')

router
    .get('/users', async (req,res)=>{
        try{
            const user = await User.find({})
            res.send(user)
        }catch(e){
            res.status(500).send(e)
        }
    })
    .get('/user/me', (req,res)=>{
        res.send('users me')
    })
    .post('/user/login',async (req,res)=>{
        try{
            const user = await User.findByCredentials(req.body.email, req.body.password)
            res.send(user)
        }catch(e){
            res.status(400).send(e)
        }
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
    .patch('/user/:id', async (req,res)=>{
        const updates = Object.keys(req.body)
        const allowUpdates = ['name', 'email', 'password', 'age']
        const isValid = updates.every(update => allowUpdates.includes(update))

        if(!isValid)    return res.status(400).send({error: 'Invalid updates'})
        try{
            // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true}) // This methods bypasses the mongoose thats why middleware of mongoose cant be used here
            const user = await User.findById(req.params.id)

            updates.forEach(update=>user[update] = req.body[update])
            await user.save()
      
            if(!user){
                return res.status(404).send({error:'User not found'})
            }
            res.send(user)
        }
        catch(e){
            res.status(400).send(e)
        }
    })
    .delete('/user/:id', async (req,res)=>{
        try{
           const user = await User.findByIdAndDelete(req.params.id)
           if(!user){
               return res.status(404).send('Huh what user is this??? I cant find it!')
           } 
           res.send('Deleted user')
        }
        catch(e){
            res.status(500).send(e)
        }
    })


module.exports = router