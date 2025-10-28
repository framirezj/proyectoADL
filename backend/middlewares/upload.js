// middlewares/upload.js
import multer from "multer";
import path from "path";

// Carpeta donde se guardan los archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  },
});

// Filtro opcional: restringe tipos de archivo
const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/jpg"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Formato de imagen no permitido"), false);
};

// Crear la instancia de multer
const upload = multer({ storage, fileFilter });

export default upload;
