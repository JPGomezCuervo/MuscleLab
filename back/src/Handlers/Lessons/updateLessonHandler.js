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
  console.log("esta es la peticion", req.file);
  const lessonAttributes = JSON.parse(req.body.lessonAttributes);
  console.log(lessonAttributes);
  const { 
    effort, 
    shortDescription, 
    goals, 
    name, 
    description, 
    scheduleDays , 
    scheduleHourStart, 
    scheduleHourFinish, 
    isAvailable, 
    monitor,
    branchOffice,
    types
  } = lessonAttributes;
  try {

    let updatedImage = image;
    if (image) {
      const uploadedImage = await cloudinary.uploader.upload(req.file.path);
      updatedImage = uploadedImage.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const updatedLesson = await updateLesson(
      id,
      effort,
      shortDescription,
      updatedImage.secure_url,
      goals,
      name, 
      description, 
      scheduleDays , 
      scheduleHourStart, 
      scheduleHourFinish,
      isAvailable,
      monitor,
      branchOffice,
      types
    );
    res.status(200).json(updatedLesson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  upload: upload.single("image"),
  updateLessons: updateLessons
};
