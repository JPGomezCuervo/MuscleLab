const updateLesson = require("../../Controllers/Lessons/updateLessonsController");
const cloudinary = require('cloudinary').v2;
require('dotenv').config;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const updateLessons = async (req, res) => {
  const { id } = req.params;
  const { 
    effort, 
    shortDescription, 
    image, 
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
  } = req.body;
  try {

    let updatedImage = image;
    if (image) {
      const uploadedImage = await cloudinary.uploader.upload(image);
      updatedImage = uploadedImage.secure_url;
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
      branchOffice,
      types
    );
    res.status(200).json(updatedLesson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = updateLessons;
