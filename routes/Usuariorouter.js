import express from 'express';
const usuario = express();
import { Registro,Verificar } from '../controllers/Usuariocontroller.js';


usuario.post('/', Registro)

usuario.post('/auth',Verificar)


export {usuario}