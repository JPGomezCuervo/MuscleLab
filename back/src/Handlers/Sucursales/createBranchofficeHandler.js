const createBranchOffice = require("../../Controllers/Sucursales/createBranchoffice.js");
const cloudinary = require('cloudinary');
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

const createNewBranchOffice = async (req, res) => {
  const lessonAttributes = JSON.parse(req.body.lessonAttributes);
  console.log(lessonAttributes);
  const {
    id,
    name,
    location,
    scheduleDays,
    scheduleHourStart,
    scheduleHourFinish,
  } = lessonAttributes;
  try {
    const uploadedImage = await cloudinary.uploader.upload(req.file.path);
    
    const newBranchOffice = await createBranchOffice(
      id,
      name,
      uploadedImage.secure_url,
      location,
      scheduleDays,
      scheduleHourStart,
      scheduleHourFinish
    );

    fs.unlinkSync(req.file.path);

    res.status(201).json({
      message: "sucursal creada correctamente",
      branchOffice: newBranchOffice,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
module.exports = {
  upload: upload.single("image"),
  createNewBranchOffice: createNewBranchOffice
};
