import { usuario } from './routes/Usuariorouter.js';
import express from 'express';
import { Publicacion } from './routes/Publicacione.js';
import cors from 'cors'
import jwt from 'jsonwebtoken'
import { Comentario } from './routes/ComentarioRoutes.js';
const app = express();


// configuracion Middleware 
app.use(express.json());
app.use(cors())

const VerificarToken = (req, res, next) => {

  const symbols = Object.getOwnPropertySymbols(req);
  // Encontrar el símbolo específico [Symbol(kHeaders)]
  const kHeadersSymbol = symbols.find(sym => sym.toString() === 'Symbol(kHeaders)');

  if (kHeadersSymbol) {
      const headers = req[kHeadersSymbol];
      const auth = headers.authorization;

      if (auth) {
          const auth_arr = auth.split(" ");
          const token = auth_arr[1];

          try {
              const tokenDecode = jwt.verify(token, 'secret')
              req.user = tokenDecode;
              next();
          } catch (err) {

              res.status(404).json(err.message)

          }
      }else {
          return res.status(403).json({ mensaje: "Se requiere un token, para acceder al metodo" })
      }

  } 

};




//cuerpo  
const port = 3000;

app.use('/api/usuario', usuario);
app.use('/api/Publicacion', VerificarToken, Publicacion)
app.use('/api/Comentario',VerificarToken,Comentario)

app.listen(port, () => {

  console.log(`escuchando puerto${port}`);

})