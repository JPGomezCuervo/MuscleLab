const updateLesson = require("../../Controllers/Lessons/updateLessonsController");
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const fs = require('fs');
require('dotenv').config();


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const storage = multer.diskStorage({
  destination: "uploads/", //se almacena en un directorio temporal de multer
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

const updateLessons = async (req, res) => {
  const { id } = req.params;

  const lessonAttributes = JSON.parse(req.body.lessonAttributes);

  const { 
    effort,
    shortDescription,
    goals,
    name,
    description,
    scheduleDays,
    scheduleHourStart,
    scheduleHourFinish,
    isAvailable,
    monitor,
    branchoffice,
    types
  } = lessonAttributes;
  try {

    let updatedImage = lessonAttributes.image;
    if (req.file) {
      const uploadedImage = await cloudinary.uploader.upload(req.file.path);
      updatedImage = uploadedImage.secure_url;
    } else {
      // En caso de que no se proporcione una nueva imagen, mantener la imagen existente
      updatedImage = lessonAttributes.image;
    }   

    const updatedLesson = await updateLesson(
      id,
      effort,
      shortDescription,
      updatedImage,
      goals,
      name, 
      description, 
      scheduleDays , 
      scheduleHourStart, 
      scheduleHourFinish,
      isAvailable,
      monitor,
      branchoffice,
      types
    );

    fs.unlinkSync(req.file.path);

    res.status(200).json(updatedLesson);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  upload: upload.single("image"),
  updateLessons: updateLessons
};
