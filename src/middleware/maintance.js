const construction = (req,res,next)=>{
    if(req.method === 'GET'){
        return res.status(503).send('Website is under construction sorry for the noise disturbance')
    }
    next()
}

module.exports = construction