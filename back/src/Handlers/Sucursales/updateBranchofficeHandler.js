const updateBranchOffice = require("../../Controllers/Sucursales/updateBranchoffice");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const fs = require("fs");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = multer.diskStorage({
  destination: "uploads/", //se almacena en un directorio temporal de multer
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const updateMyBranchOffice = async (req, res) => {

  const { id } = req.params;

  const officeAttributes = JSON.parse(req.body.officeAttributes);

  const {
    name,
    location,
    scheduleDays,
    scheduleHourStart,
    scheduleHourFinish,
  } = officeAttributes;
  try {
    const uploadedImage = await cloudinary.uploader.upload(req.file.path);

    const toUpdate = await updateBranchOffice(
      id,
      name,
      uploadedImage.secure_url,
      location,
      scheduleDays,
      scheduleHourStart,
      scheduleHourFinish
    );

    fs.unlinkSync(req.file.path);
    
    res.status(200).json(toUpdate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  upload: upload.single("image"),
  updateMyBranchOffice: updateMyBranchOffice,
};
