import { db } from "../db/conexion.js";

const CreacionPublicacion = async (req, res, next) => {

    const { descripcion,  tipo } = req.body;
    const user = req.user;
    const nombre_usuario = user.nombre_usuario;
    const { mimetype, originalname, buffer } = req.file;

    const sql = `insert into publicaciones 
                (descripcion,nombre_usuario,fotografia,nombre_foto,mime_type,tipo)
                values
                ($1, $2, $3, $4, $5,$6) returning id_publicaciones , descripcion`

    const param = [descripcion, nombre_usuario, buffer, originalname, mimetype, tipo]
    try {
        const resul = await db.query(sql, param)

        res.json({ mensaje: "Insercion exitosa", obj_insertado: resul })
    } catch (err) {
        res.status(500).json({ mensaje: `Error de compilacion`, err: err.message })
    }


}; 



const getPublicacion = async (req, res) => {

    const sql = `select  id_Publicaciones, descripcion,nombre_usuario,tipo,
                   encode(fotografia,'base64') foto
                   from publicaciones where activo = true
                   order by fecha_creacion desc `

    try {
        const result = await db.query(sql)

        if (result.length === 0) {
            res.status(404).json({ mensaje: "No hay publicaciones" })
            return;
        }
        
        res.json(result);

    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener publicaciones", error });
    }
    

   

};



const getUsuarioPublicaciones = (req, res) => {

};



export {
    CreacionPublicacion,
    getPublicacion,
    getUsuarioPublicaciones
}
