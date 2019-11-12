const express = require('express')
const router = new express.Router()
const SVG = require('../models/svg')

router
    .get('/user/svg', (req,res)=>{
        res.send('users svgs')
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
    .post('/user/svg', async (req,res)=>{
        const svg = new SVG(req.body)
        try{
            await svg.save()
            res.status(201).send('Succes')
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
    .patch('/svg/:id', async (req,res)=>{
        const updates = Object.keys(req.body)
        const allowUpdates = ['description', 'code', 'tags', 'name']
        const isValid = updates.every(update=>allowUpdates.includes(update))

        if(!isValid){
            return res.status(404).send('Invalid field young padawan')
        }
        try{
            // const svg = await SVG.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true}) // This methods bypasses the mongoose thats why middleware of mongoose cant be used here
            const svg = await SVG.findById(req.params.id)
            updates.forEach(update=>svg[update] = req.body[update])
            await svg.save()
            if(!svg){
                return res.status(404).send({error:'SVG not found'})
            }
            res.send(svg)
        }
        catch(e){
            res.status(400).send(e)
        }
    })
    .delete('/svg/:id', async (req,res)=>{
        try{
           const svg = await SVG.findByIdAndDelete(req.params.id)
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