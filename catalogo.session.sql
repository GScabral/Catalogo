CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    talles VARCHAR(100),
    precio DECIMAL(10,2),
    imagen_url VARCHAR(500)
);
