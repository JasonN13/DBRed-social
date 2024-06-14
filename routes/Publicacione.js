import express from 'express';

const Publicacion = express();
import { CreacionPublicacion, getPublicacion, getUsuarioPublicaciones } from '../controllers/Publicacioncontroller.js';

import multer from 'multer';

const storage = multer.memoryStorage()
const upload = multer({storage: storage})

Publicacion.post('/',upload.single('imagen'), CreacionPublicacion)

Publicacion.get('/', getPublicacion)

Publicacion.get('/:nombre_usuario', getUsuarioPublicaciones )

export {Publicacion}