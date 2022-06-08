const { Router } = require('express');
const axios = require ('axios');
const { Activity, Country } = require ('../db')



const apiInfo = async () => {
    try{
        const infoUrl = await axios.get("https://restcountries.com/v3/all") 
        const countries = await infoUrl.data.map(c => {
            return {
                id: c.cca3,  
                name: c.name.common,
                flags: c.flags[0],
                continents: c.continents[0],
                capital:  c.capital?.join()? c.capital.join() : "No posee capital",
                subregion: c.subregion? c.subregion : "Se desconoce la subregion",
                area: c.area,
                population: c.population,
            }
        })
        console.log(countries)
        return countries;

    }catch(error){
        console.log(error)
    }
}



const getCountries = async (req, res) => {
    try{
        const allCountries = await apiInfo()
        allCountries.forEach( (c) => {
            Country.findOrCreate({
                where: {
                    id: c.id,
                    name: c.name,
                    flags: c.flags,
                    continents: c.continents,
                    capital: c.capital,
                    subregion: c.subregion,
                    area: c.area,
                    population:c.population,

                }
            })
        })
        const totalCountries = await Country.findAll({
            include: [{
                model: Activity,
                attribute : ['name'],
                through: {
                    attribute: [],
                }
            }]
        })

        res.json(totalCountries)

    }catch(error){
        console.log(error)
    }
}



const newRequire = async (req, res) => {
    try{
        const totalCountries = await Country.findAll({
            include: [{
                model: Activity,
                attributes: ["name", "difficulty", "duration", "season"],
                through: {
                    attributes: [],
                }
            }]
        })

        res.json(totalCountries)
    }catch(error){
        console.log(error)
    }
}



const findByName = async (req, res) => {
    try{
        const { name } = req.query;
        const allNames = await Country.findAll({
            include: [{
                model: Activity,
                attributes: ["name", "difficulty", "duration", "season"],
                through: {
                    attributes: [],
                }
            }],
            where: {
                name :name.charAt(0).toUpperCase()+name.slice(1).toLowerCase()
                
            }
        });
        const findName = await allNames.map(e => {
            return {
              id: e.id,
              name: e.name,
              flags: e.flags,
              continents: e.continents,
              capital: e.capital,
              subregion: e.subregion,
              area: e.area,
              population: e.population,
              activities: e.activities.map(e => {return {
                  name: e.name,
                  difficulty: e.difficulty,
                  duration: e.duration,
                  season: e.season
              }})
            }
        })
        findName.length? res.send(findName) : res.status(400).send("No se encontro el pais indicado")
    }catch(error){
        console.log(error)
    }
}



const findById = async (req, res) => {
    try{
        const { id } = req.params;
        const allId = await Country.findAll({
            include: [{
                model: Activity,
                attributes: ["name","difficulty", "duration", "season"],
                through: {
                    attributes: [],
                }
            }],
            where :{
                id: id
            }
        });
        allId.length? res.send(allId): res.status(400).send("No se encontro el pais indicado")
    }catch(error){
        console.log(error)
    }
}



const createActivity = async (req, res) => {
    try{
        const { name, difficulty, duration, season, country } = req.body;
        const newActivity = await Activity.create({ name, difficulty, duration, season});
        
        let activityCountry = await Country.findAll({
            where: {name: country}
        })
        newActivity?.addCountry(activityCountry);
        res.send("Actividad creada!")

    }catch(error){
        console.log(error)
    }
}


const continents = async (req, res) => {
    let countries = await apiInfo();
    let allContinents = [];
    countries.map(c => allContinents.push(c.continents));

    const names = [... new Set(allContinents)]
    console.log(names)
    res.status(200).json(names)
}



const allActivities = async (req, res) => {
    const dataBase = await Activity.findAll({
        include :[{
            model: Country,
            attribute: ["name:", "flags", "continents", "capital"],
            through: {
                attributes: [],
            }
        }]
    })
    const name = [... new Set(dataBase.map(c => c.name))]

    res.send(name)
}





module.exports = {getCountries, findByName, newRequire, findById, createActivity, continents, allActivities}













