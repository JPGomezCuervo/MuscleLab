const {
  Lessons,
  LessonDetail,
  ExercisesType,
  User,
  BranchOffice,
  Reviews,
} = require("../../db");
const { Op } = require("sequelize");
const moment = require("moment");

const getDetailLesson = async (name) => {
  const lesson = await Lessons.findOne({
    where: { name: { [Op.like]: name } },
    include: {
      model: ExercisesType,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  const monitorRaw = await User.findAll({
    include: {
      model: LessonDetail,
      attributes: ["name"],
      through: {
        attributes: [],
      },
      where: {
        lessonId: lesson.id,
      },
    },
    where: {
      isMonitor: true,
    },
  });
  const officeRaw = await BranchOffice.findAll({
    include: {
      model: LessonDetail,
      attributes: ["name"],
      through: {
        attributes: [],
      },
      where: {
        lessonId: lesson.id,
      },
    },
  });

  const offices = officeRaw.map((o) => ({
    name: o.name,
    lessons: o.lessonDetails,
  }));

  const monitors = monitorRaw.map((m) => ({
    name: m.fullName,
    lesson: m.lessonDetails,
  }));

  const types = lesson.exercisesTypes.map((e) => e.name);

  const detail = await LessonDetail.findAll({
    include:{
      model: Reviews
    },
    where: { 
      lessonId: lesson.id, 
      deletedAt: null },
  });  

  const final = [];
  for (const item of detail) {
    let monitor;
    let office;
    let fullName = [];
  for(let i = 0; i < item.reviews.length; i++){
    const usuario = await User.findOne({
      where:{
        id: item.reviews[i].userId
      }
    });
    fullName.push(usuario.fullName);
  }
  const reviewCount = item.reviews.length;
  let totalStars = 0;
  for(let i = 0; i < reviewCount; i++){
    totalStars = totalStars + Number(item.reviews[i].stars);
    
  }
  
  console.log(totalStars);
  const averageStars = reviewCount > 0 ? totalStars / reviewCount : 0;

    for (const m of monitors) {
      if (m.lesson.some((lesson) => lesson.name === item.name)) {
        monitor = m.name;
        break;
      }
    }

    for (const o of offices) {
      if (o.lessons.some((lesson) => lesson.name === item.name)) {
        office = o.name;
        break;
      }
      
    }

    const objDetail = {
      id: item.id,
      name: item.name,
      image: lesson.image,
      effort: lesson.effort,
      goals: lesson.goals,
      description: item.description,
      scheduleDays: item.scheduleDays,
      scheduleHourStart: item.scheduleHourStart,
      scheduleHourFinish: item.scheduleHourFinish,
      isAvailable: item.isAvailable,
      types,
      monitors: monitor,
      office,
      reviews: item.reviews.map((review, index) => ({
        id: review.id,
        stars: review.stars,
        description: review.description,
        user: fullName[index],
        createdAt: moment(review.createdAt).fromNow(),
      })),
      reviewCount,
      averageStars,
    };

    final.push(objDetail);
  }
  return final;
};

module.exports = {
  getDetailLesson,
};
