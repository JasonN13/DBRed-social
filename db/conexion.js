import pgPromise from 'pg-promise';
import dotenv from 'dotenv';

const pgp = pgPromise();

dotenv.config();

const user = process.env.user_db;
const pass = process.env.user_pass;
const host = process.env.host;
const database = process.env.database;
const port = process.env.port_db;

const conexion = `postgresql://${user}:${pass}@${host}:${port}/${database}`;

const db = pgp(conexion);

db.connect()
    .then(() => {
        console.log("¡Conexión exitosa!");
    })
    .catch((err) => {
        console.log(`Error de conexión: ${err}`);
    });

export { db };
