import express from 'express';
import { crearComentario,obtenerComentariosPorPublicacion } from '../controllers/ComentarioController.js';

const Comentario = express();

Comentario.post('/comentarios', crearComentario);
Comentario.get('/comentarios/:id_publicacion', obtenerComentariosPorPublicacion);

export { Comentario  };
