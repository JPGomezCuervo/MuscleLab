const createLesson = require("../../Controllers/Lessons/createLesson");
const cloudinary = require('cloudinary').v2;
require('dotenv').config;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const createNewLesson = async (req, res) => {
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
    image,
    types,
    monitor,
    branchoffice,
  } = req.body;
  try {
    const uploadedImage = await cloudinary.uploader.upload(image)
    
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
    res
      .status(201)
      .json({ message: "Lesson created succesfully", lesson: newLesson });
  } catch (error) {
    res.status(400).json({error:error.message});
  }
};
module.exports = createNewLesson;
