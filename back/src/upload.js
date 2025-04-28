const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads')); // Carpeta donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    // Guardar con nombre único (timestamp + originalname)
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Filtro para aceptar solo imágenes
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const mimeType = allowedTypes.test(file.mimetype);
  const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb(new Error('Formato de imagen no válido. Solo JPG, JPEG, PNG o GIF.'));
  }
};

// Middleware de subida configurado
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Máximo 5MB por imagen
});

module.exports = upload;
