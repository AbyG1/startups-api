import { startups } from "../data/data.js"



const addData = (req,res) => {



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
            return res.status(400).json({
        message:
          "Missing required fields: name, industry, founded, country, continent, is_seeking_funding, has_mvp",
      });
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
        return res.status(500).json({
            message: "Server error while adding startup",
            error: error.message,
    });
  }
};



const getAllData = (req, res) => {

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

}


const getDataByPathParams = (req, res) => {

  const { field, term } = req.params

  const allowedFields = ['country', 'continent', 'industry']

  if (!allowedFields.includes(field)) {
    return res.status(400).json({ message: "Search field not allowed. Please use only country, continent, industry" })
  }

  const filteredData = startups.filter(
    startup => startup[field].toLowerCase() === term.toLowerCase()
  )

  res.json(filteredData)
}



const updateData = (req,res) => {




    try{

        const id = parseInt(req.params.id)    

        const startupIndex = startups.findIndex(startup => startup.id === id)


        if(startupIndex === -1){
            console.log(startups.length, !startups.length)
            return res.status(400).json({message: `The startup with the id ${id} doesnot exit`})
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

        res.status(500).json({message: "Internal server error"})

    }

   




}



const deleteData = (req,res) => {




}



export {addData, getDataByPathParams,getAllData,updateData}