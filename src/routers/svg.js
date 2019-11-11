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

module.exports = router