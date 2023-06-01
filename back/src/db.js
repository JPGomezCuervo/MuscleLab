require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DATABASE_URL } = process.env;

const isLocal = true; // Cambia esto a false si deseas utilizar la base de datos en línea

let sequelize;

if (isLocal) {
  sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
    {
      logging: false,
      native: false,
    }
  );
} else {
  sequelize = new Sequelize(`${DATABASE_URL}`, {
    logging: false,
    native: false,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
}
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  BranchOffice,
  LessonDetail,
  Lessons,
  User,
  StatusMemberships,
  ExercisesType,
  Reviews
} = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

User.hasOne(StatusMemberships);
StatusMemberships.belongsTo(User);

Lessons.belongsToMany(ExercisesType, { through: "Lessons_Type" });
ExercisesType.belongsToMany(Lessons, { through: "Lessons_Type" });

User.belongsToMany(LessonDetail, { through: "User_Lesson" });
LessonDetail.belongsToMany(User, { through: "User_Lesson" });

Lessons.hasOne(LessonDetail);
LessonDetail.belongsTo(Lessons);

LessonDetail.belongsToMany(BranchOffice, { through: "Lesson_BranchOffice" });
BranchOffice.belongsToMany(LessonDetail, { through: "Lesson_BranchOffice" });

LessonDetail.belongsToMany(ExercisesType, { through: "Lesson_ExercisesType" });
ExercisesType.belongsToMany(LessonDetail, { through: "Lesson_ExercisesType" });

User.hasMany(Reviews);  
Reviews.belongsTo(User);

LessonDetail.hasMany(Reviews);
Reviews.belongsTo(LessonDetail);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
