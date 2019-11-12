const express = require('express')
require('./db/mongoose')
const app = express()
const port = process.env.PORT
const userRouter = require('./routers/user')
const svgRouter = require('./routers/svg')
// const maintance = require('./middleware/maintance')
app 
    // .use(maintance)
    .use(express.json())
    .use(userRouter)
    .use(svgRouter)
    .listen(port,()=>{console.log(`Server is listening to port ${port}`)})
