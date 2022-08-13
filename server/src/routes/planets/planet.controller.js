const {getAllPlanets} = require('../../models/planet.model')

const httpGetAllPlanets = async (req, res)=>{
    return res.status(200).json(await getAllPlanets());
}


module.exports = {
    httpGetAllPlanets,
};


