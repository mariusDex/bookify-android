const express = require("express")
const router = express.Router()

// Ruta donde tenemos el controller en este proyecto
const hotelController = require("../controller/hotelController");

// --- ESTO es como el Controller?ACTION=Productos.FIND_ALL ---
// Según lo que pongas después de "posts" en el localhost:3000/api/v2/posts/ hace una cosa u otra 
// definida en posts.controller

// CASE :  localhost:3000/booking/hoteles
router.get("/hotels/:id/:name/:city/:country/:check_in/:check_out", hotelController.getAll)    

       // esto es como en el DAO. --> query()
// CASE :  localhost:3000/apiejemplo/posts/2
router.get("/hotels", hotelController.getAll)
// CASE :  localhost:3000/apiejemplo/mariusz/broza/18
router.post("/:nombre/:apellido/:edad", hotelController.create) // ---> insert()
// CASE :  localhost:3000/apiejemplo/update/mariusz2/broza2/23/1
router.put("/update/:nombre/:apellido/:edad/:id", hotelController.update) // ---> update()
router.delete("/:id", hotelController.delete) // --> delete()



// Si os fijáis DIFERENCIA ENTRE : { GET , POST , PUT , DELETE }, por lo tanto, puede haber dos casos iguales, pero si es post o get hacen cosas distintas
// Ejemplo : router.get("/:id", hotelController.getById) ----> Devuelve un registro por ID 
//           router.post("/:id", hotelController.updateRegistro) ----> updatea un registro con esa ID

// Si la llamada es POST --> se ejecuta el router.post
// Si la llamada es GET  --> se ejecuta el router.get

module.exports = router