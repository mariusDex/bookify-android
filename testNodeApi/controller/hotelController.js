
const pool = require("../database/index")
const SQL_SELECT = 'SELECT * FROM HOTEL WHERE (1=1) ';
const SQL_UPDATE = 'UDPATE HOTEL SET';
// -------------------------> AQUÍ DESARROLLAREMOS TODOS LOS MÉTODOS QUE NOS HAGA FALTA <------------------

// NOTAS : Por supuesto podemos tener varios controllers (lo suyo sería tener 1 POR TABLA para tener todo estructurado, a mode de EmployeeDAO, ProductosDAO etc...)
const hotelController = {

    getAll: async (req,res) => {
        try {
            const { id ,name, city,country,check_in, check_out } = req.params;
            
            console.log('Variables : ' + country);
            var sql = SQL_SELECT;
            var arrayCampos = new Array();
            
            if(id !=0 && id > 0){
                console.log('Filtrando por ID');
                sql += ' AND hotel_id = ? ' ;
                arrayCampos.push(id);
            }
            if(name != 'null' && name != undefined){
                console.log('Filtrando por NAME');
                sql += ' AND name = ? ';
                arrayCampos.push(name);
            }
            if(city != 'null' && city != undefined){
                console.log('Filtrando por CITY');
                sql += ' AND city = ? ';
                arrayCampos.push(city);
            }
            if(country != 'null'  && country != undefined){
                console.log('Filtrando por COUNTRY');
                sql += ' AND country = ? ';
                arrayCampos.push(country);
            }
            if(check_in != 'null' && check_in != undefined){
                sql += ' AND check_in = ? ';
                arrayCampos.push(check_in);
            }
            if(check_out != 'null' && check_out != undefined){
                sql += ' AND check_out = ? ';
                arrayCampos.push(check_out);
            }
            if(arrayCampos.length == 0){
                console.log('Array VACIO');
                console.log("Haciendo query BASICA " + SQL_SELECT);
                var [rows, fields] = await pool.query(SQL_SELECT); 
            }else{
                console.log('Array LLENO');
                console.log('Array : ' + arrayCampos.toString());
                console.log('Ejecutando query : ' + sql );
                var [rows, fields] = await pool.query(sql,arrayCampos); 
            }
            
            // queremos que nos devuelva las ROWS que salen de la query : 
            res.json({
                data : rows 
            })
            
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    getById : async (req,res) => {
        // si lo que nos llega en el localhost:3000/api.... son parametros --> req.params
        try {
            const { id } = req.params

            // las interragaciones su sustituyen por las variables que tenemos en orden después de la coma. Ejemplo con múltiples en el método create justo debajo
            const [rows, fields]  = await pool.query("SELECT * FROM `employee` WHERE id = ?", [id]) 

            res.json({
                data : rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    create: async (req,res) => {
        try {
            // http://localhost:3000/api/v1/posts/mariusz/broza/18 PARA CREAR SEGÚN EL PATRON EN ROUTER
            const { nombre, apellido, edad } = req.params
            const sql = "INSERT INTO employee (nombre,apellido,edad) VALUES(?,?,?)"
            const [rows, fields] = await pool.query(sql,[nombre, apellido, edad])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    update: async (req,res) => {
        try {
            const { nombre, apellido, edad, id} = req.params
            const sql = "UPDATE employee SET nombre = ?, apellido = ?, edad = ? WHERE id = ?"
            const [rows,fields] = await pool.query(sql,[nombre, apellido, edad, id])
            // respuesta
            res.json({
                data : rows // lo que queremos que nos devuelva , es decir, las filas afectadas etc
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })    
        }
    },
    delete : async (req,res) => {
        try {
            const { id } = req.params
            const sql = "DELETE FROM employee WHERE id = ?"
            const [rows,fields] = await pool.query(sql,[id])

            res.json({
                data : rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })  
        }
    }

}

module.exports = hotelController