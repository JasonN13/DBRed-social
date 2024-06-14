import { db } from "../db/conexion.js";


const crearComentario = async (req, res) => {
    const { id_publicacion, comentario } = req.body;
    const nombre_usuario = req.session.nombre_usuario; // Obtener nombre de usuario de la sesión

    const sql = `INSERT INTO comentarios (id_publicacion, nombre_usuario, comentario, fecha_creacion)
                 VALUES ($1, $2, $3, NOW()) RETURNING id_comentario, comentario, fecha_creacion`;

    const params = [id_publicacion, nombre_usuario, comentario];

    try {
        const result = await db.query(sql, params);
        res.json({ mensaje: "Comentario creado exitosamente", comentario: result.rows[0] });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear comentario", error: error.message });
    }
};



const obtenerComentariosPorPublicacion = async (req, res) => {
    const { id_publicacion } = req.params;

    const sql = `SELECT c.id_comentario, c.comentario, c.fecha_creacion, u.nombre_usuario, u.foto_perfil
                 FROM comentarios c
                 JOIN usuarios u ON c.nombre_usuario = u.nombre_usuario
                 WHERE c.id_publicacion = $1 AND c.activo = true
                 ORDER BY c.fecha_creacion DESC`;

    try {
        const result = await db.query(sql, [id_publicacion]);
        if (result.rows.length === 0) {
            res.status(404).json({ mensaje: "No hay comentarios para esta publicación" });
            return;
        }
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener comentarios", error: error.message });
    }
};

export { crearComentario, obtenerComentariosPorPublicacion };
