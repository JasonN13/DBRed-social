import { usuario } from './routes/Usuariorouter.js';
import express from 'express';
const app = express();


// configuracion Middleware 
app.use(express.json());


//cuerpo  
const port= 3000;

app.use('/api/usuario', usuario);

app.listen(port,()=>{

  console.log(`escuchando puerto${port}`);
  
})