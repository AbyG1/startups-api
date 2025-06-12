import { startups } from "../data/data.js"



export const addData = (req,res) => {



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

    



