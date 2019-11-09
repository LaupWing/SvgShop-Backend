const express = require('express')
const router = new express.Router()
const SVG = require('../models/svg')

router
    .get('/user/svg', (req,res)=>{
        res.send('users svgs')
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
    .get('/svg', (req,res)=>{
        res.send('show all svg')
    })

module.exports = router