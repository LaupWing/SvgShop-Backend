const express = require('express')
const router = new express.Router()
const Svg = require('../models/svg')

router
    .get('/user/svg', (req,res)=>{
        res.send('users svgs')
    })
    .post('/user/svg', (req,res)=>{
        res.send('posting svg')
    })
    .get('/svg', (req,res)=>{
        res.send('show all svg')
    })

module.exports = router