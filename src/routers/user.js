const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')

const upload = multer({
    limits:{
        fileSize: 1000000
    },
    fileFilter(req, file , cb){
        // cb(new Error('File must be a pdf')) // first argument is an error, second is upload pass or not (Boolean)
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Pleade upload a pdf'))
        }
        cb(undefined, true)
    }
})

router
    .get('/users',auth, async (req,res)=>{
        try{
            const user = await User.find({})
            res.send(user)
        }catch(e){
            res.status(500).send(e)
        }
    })
    .get('/user', auth,(req,res)=>{
        res.send(req.user)
    })
    .post('/user/login',async (req,res)=>{
        try{
            const user = await User.findByCredentials(req.body.email, req.body.password)
            const token = await user.generateAuthToken()

            res.send({user:user.getPublicProfile(), token})
        }catch(e){
            res.status(400).send(e)
        }
    })
    .post('/user', async (req,res)=>{
        const user = new User(req.body)
        try{
            await user.save()  
            const token = await user.generateAuthToken()
            res.status(201).send({user, token}) 

        }catch(e){
            res.status(400).send(e)
        }
    })
    .post('/user/avatar',auth, upload.single('avatar'), async (req,res)=>{
        console.log(req.file.buffer)
        req.user.avatar = req.file.buffer
        await req.user.save()
        res.send()
    },(error, req, res, next)=>{
        res.status(400).send({
            error: error.message
        })
    })
    .post('/user/logout',auth, async (req,res)=>{
        try{
            req.user.tokens = req.user.tokens.filter(token=>token.token!==req.token)
            await req.user.save()
            res.send('You have succesfully signed out the matrix young padawan')
        }
        catch(e){
            res.status(500).send('HUH WHAAT')
        }
    })
    .post('/user/logoutAll', auth, async (req,res)=>{
        try{
            req.user.tokens = []
            await req.user.save()
            res.send('You have logged out from all the devices beep beep')
        }catch(e){
            res.status(500).send()
        }
    })
    .patch('/user', auth, async (req,res)=>{
        const updates = Object.keys(req.body)
        const allowUpdates = ['name', 'email', 'password', 'age']
        const isValid = updates.every(update => allowUpdates.includes(update))
        if(!isValid)    return res.status(400).send({error: 'Invalid updates'})
        try{
            // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true}) // This methods bypasses the mongoose thats why middleware of mongoose cant be used here
            updates.forEach(update=>req.user[update] = req.body[update])
            await req.user.save()
      
            res.send(req.user)
        }
        catch(e){
            res.status(400).send(e)
        }
    })
    .delete('/user',auth, async (req,res)=>{
        try{
            await req.user.remove()             
            res.send({
                type: 'DELETED',
                obj: req.user
            })
        }
        catch(e){
            res.status(500).send(e)
        }
    })
    .delete('/user/avatar', auth, async (req,res)=>{
        req.user.avatar = undefined
        await req.user.save()
        res.send()
    })


module.exports = router