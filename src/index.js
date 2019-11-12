const express = require('express')
require('./db/mongoose')
const app = express()
const port = process.env.PORT
const userRouter = require('./routers/user')
const svgRouter = require('./routers/svg')

app 
    .use((req,res,next)=>{
        if(req.method === 'GET'){
            return res.status(503).send('Website is under construction sorry for the noise disturbance')
        }
        next()
    })
    .use(express.json())
    .use(userRouter)
    .use(svgRouter)
    .listen(port,()=>{console.log(`Server is listening to port ${port}`)})
