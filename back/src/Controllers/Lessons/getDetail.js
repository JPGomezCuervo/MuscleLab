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

  const detail = await LessonDetail.findAll({
    include: {
      model: Reviews,
      include: {
        model: User,
        attributes: ["fullName"],
      },
    },
    where: {
      lessonId: lesson.id,
      deletedAt: null,
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

  const offices = officeRaw.map((o) => ({
    name: o.name,
    lessons: o.lessonDetails,
  }));

  const monitors = monitorRaw.map((m) => ({
    name: m.fullName,
    lesson: m.lessonDetails,
  }));

  const types = lesson.exercisesTypes.map((e) => e.name);

  const final = [];
  for (const item of detail) {
    const fullName = item.reviews.map((review) => review.user.fullName);

    const totalStars = item.reviews.reduce(
      (sum, review) => sum + Number(review.stars),
      0
    );

    const reviewCount = item.reviews.length;
    const averageStars = Math.round(reviewCount > 0 ? totalStars / reviewCount : 0);

    const monitor = monitors.find((m) =>
      m.lesson.some((lesson) => lesson.name === item.name)
    )?.name;

    const office = offices.find((o) =>
      o.lessons.some((lesson) => lesson.name === item.name)
    )?.name;

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