const { Router } = require('express');
const axios = require ('axios');
const { Activity, Country } = require ('../db')


const router = Router();


const getApiInfo = async () => {
    const { data } = await axios('https://restcountries.com/v3/all');
    const apiInfo = await data.map(country => { 
        
        return {
           id: country.cca3,
           name: country.name.common,
           img: country.flags[0],
           continents: country.continents[0],
           capital: country.capital?.[0] , //?.[0] por alguna razon pregunto y accedo
           subregion: country.subregion,  // de lo contrario no accedo
           area: country.area,
           population: country.population,
        }
    });
    const countryResul = await Country.bulkCreate(apiInfo)
    return countryResul;
}






const getDb = async() => { //traer db e incluir una actividad
    return await Country.findAll({
        include: {
            model: Activity,
            attribute: ['name', 'difficulty', 'duration', 'season'],
            through: {
                attributes: []
            }
        }
    })
}











//RUTEO-------------------------------x--------------------------------












router.get('/countries' , async(req, res) => { // /countries?name=argentina
    const { name } = req.query;
        //   countries = await getApiInfo();
        let countries;
        const countryDB = await Country.count(); //aqui cuento los registros de countries
        countries = countryDB === 0 ?
        await getApiInfo() :// asi que si la db esta vacia llamo a la api
        await getDb() // si no saco de la bd 
    if ( name ) {
        console.log("este es el name" ,name)
        const byName = countries.filter(n => n.name.toLowerCase().includes(name.toLowerCase()));
        byName.length ? 
        res.status(200).send(byName) :
        res.status(404).json({ error: 'no se encontro ningun pais' })
    }  else {
       res.status(200).send(countries)  
    }
      
})





router.get('/countries/:id', async (req, res) => {
    const { id } = req.params;
    const allCountries = await getDb();
    if ( id ) {
        const idCountries = allCountries.filter( i => i.id === id )
        idCountries.length?
        res.status(200).send(idCountries) :
        res.status(404).send('id no valido')
    }
})




// router.get('/activity/:id' ,async (req,res)=> {
//     try {
//         var id= req.params.id
//         let data =await Country.findAll({
//             where: {id : id }, include: Activity
//         })
//         res.json(data)
//     } catch (error) {
//         console.log('Error en get country por Id', error)
//     }
// } )
router.get('/activity', async (req, res) =>{
    try{
      const activities= await Activity.findAll({
        atributes:['id', 'name','dificult', 'duration', 'season'],
        include: Country
      })
      activities.length >0 ? 
      res.status(200).send(activities):
      res.status(200).send('Activities not found')
    }catch(error){
      res.status(404).send(error);
    }
  })





router.post("/activity",async (req,res)=>{
    try {
        const { name, difficulty, duration, season, country } = req.body;
        const newActivity = await Activity.create({ name, difficulty, duration, season});

         let activityAndCountry = await Country.findAll({
             where: {name: country}
        })

         newActivity?.addCountry(activityAndCountry);
          res.send("Actividad creada!")

    } catch (error) {
        console.log (error, "No se creo la actividad")
    }   
})





module.exports = router;













