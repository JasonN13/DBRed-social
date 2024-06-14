-- Active: 1715485426440@@LocalHost@5432@rsocial
CREATE TABLE usuarios (
    nombre_usuario VARCHAR(100) PRIMARY KEY,
    nombre VARCHAR(80) NOT NULL,
    apellido VARCHAR(80)NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(100) NOT NULL,
    foto_perfil VARCHAR(500),
    fecha_creacion  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOL DEFAULT TRUE 
);

CREATE TABLE publicaciones (
    id_Publicaciones SERIAL PRIMARY KEY,
    nombre_usuario VARCHAR(100) REFERENCES usuarios(nombre_usuario),
    fotografia BYTEA,
    nombre_foto VARCHAR(500),
    mime_type VARCHAR (500),
    descripcion VARCHAR(200) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOL DEFAULT TRUE 
);

ALTER TABLE publicaciones ADD COLUMN tipo VARCHAR(50);


CREATE TABLE comentarios (
    id_comentario SERIAL PRIMARY KEY,
    id_publicacion INT REFERENCES publicaciones(id_Publicaciones) ON DELETE CASCADE,
    nombre_usuario VARCHAR(100) REFERENCES usuarios(nombre_usuario) ON DELETE CASCADE,
    comentario TEXT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOL DEFAULT TRUE
);



SELECT * FROM publicaciones

SELECT * FROM usuarios


select  id_Publicaciones, descripcion,nombre_usuario,
                   encode(fotografia,'base64') foto
                   from publicaciones where activo = true
                   order by fecha_creacion desc