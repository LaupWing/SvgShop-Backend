const express = require('express')
require('./db/mongoose')
const app = express()
const port = process.env.PORT
const userRouter = require('./routers/user')

app 
    .use(express.json())
    .use(userRouter)
    .listen(port,()=>{console.log(`Server is listening to port ${port}`)})
