const { Router } = require('express');
const { getCountries, findByName, findById, createActivity, newRequire, continents, allActivities} = require("../routes/Controllers")


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

 router.get("/countriesGet", getCountries),
 router.get("/countries", newRequire)
 router.get("/countries/:id", findById),
 router.get("/countriesN", findByName),
 router.post("/activity", createActivity),
 router.get("/continents", continents),
 router.get("/activities", allActivities)







module.exports = router;