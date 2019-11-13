const express = require('express')
const router = new express.Router()
const SVG = require('../models/svg')
const auth = require('../middleware/auth')

router
    .get('/user/svg', auth, async (req,res)=>{
        await req.user.populate('svgs').execPopulate()
        res.send(req.user.svgs)
    })
    .get('/user/:id/svg', async (req,res)=>{
        const svg = await SVG.find({author:req.params.id})
        res.send({
            type: 'SVG_ID_USER',
            obj: svg
        })
    })
    .get('/svg/:id', async (req,res)=>{
        const {id} = req.params
        try{
            const svg = await SVG.findById(id)
            if(!svg){
                return res.status(404).send()
            }
            res.send(svg)
        }catch(e){
            res.status(500).send(e)
        }
    })
    .post('/svg', auth ,async (req,res)=>{
        const svg = new SVG({
            ...req.body,
            author: req.user._id
        })
        try{
            await svg.save()
            res.status(201).send({
                type: 'ADDED_SVG',
                obj: svg
            })
        }
        catch(e){
            res.status(400).send('Something went wrong in the server')
        }
    })
    .get('/svg', async (req,res)=>{
        try{
            const svgs = await SVG.find({})
            res.send(svgs)
        }catch(e){
            res.status(500).send(e)
        }
    })
    .patch('/svg/:id', auth,  async (req,res)=>{
        const updates = Object.keys(req.body)
        const allowUpdates = ['description', 'code', 'tags', 'name']
        const isValid = updates.every(update=>allowUpdates.includes(update))

        if(!isValid){
            return res.status(404).send('Invalid field young padawan')
        }
        try{
            // const svg = await SVG.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true}) // This methods bypasses the mongoose thats why middleware of mongoose cant be used here
            console.log(req.params.id, req.user._id)
            const svg = await SVG.findOne({_id:req.params.id, author: req.user._id})
            if(!svg){
                return res.status(404).send({error:'SVG not found'})
            }
            updates.forEach(update=>svg[update] = req.body[update])
            await svg.save()
            res.send(svg)
        }
        catch(e){
            res.status(400).send(e)
        }
    })
    .delete('/svg/:id', async (req,res)=>{
        try{
           const svg = await SVG.findOneAndDelete({_id:req.params.id, author: req.user._id})
           if(!svg){
               return res.status(404).send('Cant find this piece of art!!')
           } 
           res.send('Succesfully deleted this ex-wonderful svg from this platform')
        }
        catch(e){
            res.status(400).send(e)
        }
    })

module.exports = router