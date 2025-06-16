import  startups  from "../data/data.js"



const addData = (req,res,next) => {



    try{

        const {
                name,
                industry,
                founded,
                country,
                continent,
                is_seeking_funding,
                has_mvp,
                business_address = {},
                founders = [],
                employees,
                website,
                mission_statement,
                description
            } = req.body;


        if(!name || !industry || !founded || !country || !continent || is_seeking_funding === undefined || !has_mvp === undefined){
           
          throw new Error("Missing required fields: name, industry, founded, country, continent, is_seeking_funding, has_mvp",)
        }

        const id = startups.length ? startups.length + 1 : 1

        const newStartup = {
            id,
            name,
            industry,
            founded,
            country,
            continent,
            is_seeking_funding,
            has_mvp,
            business_address,
            founders,
            employees,
            website,
            mission_statement,
            description
        }


    startups.push(newStartup)    


    res.status(201).json({message: newStartup})


    } catch (error) {


      if(error.message === "Missing required fields: name, industry, founded, country, continent, is_seeking_funding, has_mvp"){
        error.status = 400
      }
       next(error)
      
       
  }
};



const getAllData = (req, res, next) => {

  try{

     let filteredData = startups

  const { industry, country, continent, is_seeking_funding, has_mvp } = req.query

  if (industry) {
    filteredData = filteredData.filter(startup =>
      startup.industry.toLowerCase() === industry.toLowerCase()
    )
  }

  if (country) {
    filteredData = filteredData.filter(startup =>
      startup.country.toLowerCase() === country.toLowerCase()
    )
  }

  if (continent) {
    filteredData = filteredData.filter(startup =>
      startup.continent.toLowerCase() === continent.toLowerCase()
    )
  }

  if (is_seeking_funding) {
    filteredData = filteredData.filter(startup =>
      startup.is_seeking_funding === JSON.parse(is_seeking_funding.toLowerCase())
    )
  }

  if (has_mvp) {
    filteredData = filteredData.filter(startup =>
      startup.has_mvp === JSON.parse(has_mvp.toLowerCase())
    )
  }

  res.json(filteredData)



  } catch(err){

      next(err)

  }

 

}


const getDataByPathParams = (req, res, next) => {


  try{

     const { field, term } = req.params

    const allowedFields = ['country', 'continent', 'industry']

    if (!allowedFields.includes(field)) {
      throw new Error("Search field not allowed. Please use only country, continent, industry")
    }

    const filteredData = startups.filter(
      startup => startup[field].toLowerCase() === term.toLowerCase()
    )

    res.json(filteredData)
  
  } catch(error){

      if(error.message === "Search field not allowed. Please use only country, continent, industry" ){
        error.status = 400
      }
        next(error)
      }

  }

  

 



const updateData = (req,res,next) => {




    try{

        const id = parseInt(req.params.id)    

        const startupIndex = startups.findIndex(startup => startup.id === id)


        if(startupIndex === -1){
            throw new Error('The startup with the id doesnot exit')
        
        }



        const allowedFields = [
        "name",
        "industry",
        "founded",
        "country",
        "continent",
        "is_seeking_funding",
        "has_mvp",
        "business_address",
        "founders",
        "employees",
        "website",
        "mission_statement",
        "description"
        ];


        const updates = {};
            for (const key of allowedFields) {
                if (req.body.hasOwnProperty(key)) {
                updates[key] = req.body[key];
            }
        }


        
        const startup = startups.find(startup => startup.id === id)



        startups[startupIndex] = {...startup, ...updates}

        

        res.status(201).json({
                            message:"updated",
                            data:startups[startupIndex]
                            })
    
    } catch(error) {

      if(error.message === 'The startup with the id doesnot exit'){
        error.status = 404
       
      }
        next(error)
      
       
    }

   


}



const deleteData = (req,res,next) => {

    try{

        const id = parseInt(req.params.id)

        const startupIndex = startups.findIndex(startup => startup.id === id)
     
        if(startupIndex === -1){
      
          throw new Error('The startup with the id doesnot exit')
       
        
        }

        const deletedData = startups.splice(startupIndex,1) 


        res.status(200).json({message: "Data successfully deleted",  deletedData})




    } catch (error){
      console.log(error)
        if(error.message === 'The startup with the id doesnot exit'){
          
        error.status = 404
      
        }
        next(error)
      }
      
    }
   








export {addData, getDataByPathParams,getAllData,updateData, deleteData}