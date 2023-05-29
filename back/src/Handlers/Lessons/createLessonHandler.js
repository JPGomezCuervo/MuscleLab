const createLesson = require("../../Controllers/Lessons/createLesson");
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const fs = require('fs');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

//configuracion de multer para cargar archivos desde pc
const storage = multer.diskStorage({
  destination: "uploads/", //se almacena en un directorio temporal de multer
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

const createNewLesson = async (req, res) => {
  console.log("esta es la peticion", req.file);
  const lessonAttributes = JSON.parse(req.body.lessonAttributes);
  console.log(lessonAttributes);
  const {
    id,
    name,
    effort,
    goals,
    shortDescription,
    description,
    scheduleDays,
    scheduleHourStart,
    scheduleHourFinish,
    types,
    monitor,
    branchoffice,
  } = lessonAttributes;
  try {
    const uploadedImage = await cloudinary.uploader.upload(req.file.path);
    
    const newLesson = await createLesson(
      id,
      name,
      effort,
      goals,
      shortDescription,
      description,
      scheduleDays,
      scheduleHourStart,
      scheduleHourFinish,
      uploadedImage.secure_url,
      types,
      monitor,
      branchoffice
    );

    fs.unlinkSync(req.file.path); //eliminar el archivo del directorio temporal de multer

    res.status(200).json({ message: "Lección creada con éxito", lesson: newLesson });
  } catch (error) {
    console.log(error);
    res.status(400).json({error:error.message});
  }
};
module.exports = {
  upload: upload.single("image"), // Middleware para procesar la imagen
  createNewLesson: createNewLesson
};
