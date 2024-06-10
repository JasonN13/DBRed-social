-- Active: 1715485426440@@LocalHost@5432@rsocial
CREATE TABLE usuarios (
    nombre_usuario VARCHAR(100) PRIMARY KEY,
    nombre VARCHAR(80) NOT NULL,
    apellido VARCHAR(80)NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(100) NOT NULL,
    foto_perfil VARCHAR(255),
    fecha_creacion  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOL DEFAULT TRUE 
);
