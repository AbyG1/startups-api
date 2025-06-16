const notFound = (req,res,next) => {
    res.status(404).json({ message: "Endpoint not found. Please check the API documentation." })    
}

export default notFound