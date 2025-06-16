const errorhandler = (err, req, res, next) => {

    if(err.status){
        return res.status(err.status).json({msg:err.message})
    }

    res.status(500).json({msg: "Internal server error"})

}

export default errorhandler