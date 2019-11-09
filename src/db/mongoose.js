const mongoose = require('mongoose')

mongoose.connect(`${process.env.MONGODB_URL}`, {
    useNewUrlParser:true,
    useCreateIndex:true, // true to quickly acces the data we need
    useUnifiedTopology: true,
    useFindAndModify: false
})