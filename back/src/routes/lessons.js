const { Router } = require("express");
const server = Router();

const createNewLesson = require("../Handlers/Lessons/createLessonHandler");
const deleteMyLesson = require("../Handlers/Lessons/deleteLessonHandler");

server.get("/", async (req, res) => {
  res.status(200);
});

server.get("/:id", async (req, res) => {
  res.status(200);
});
server.post("/create", createNewLesson);
server.delete("/delete/:id", deleteMyLesson);

module.exports = server;
