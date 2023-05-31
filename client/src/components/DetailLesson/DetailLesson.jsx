import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  selectLesson,
  selectAllLessons,
  fetchLessonByName,
} from "../../redux/features/lessonsSlice";
import { useEffect, useState } from "react";
import { URL } from "../../utils/constants";
import style from "./DetailLesson.module.css";
import brad from "../../assets/images/detail/brad.jpeg";
import plus from "../../assets/icons/plus.png";
import NavBar from "../NavBar/NavBar";
import { useParams, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

const DetailLesson = () => {
  const lesson = useSelector(selectAllLessons);

  //    if(Object.keys(lesson).length !== 0){
  //     lesson?.map(el=> console.log(1))
  //    }

  const dispatch = useDispatch();
  const params = useParams();

  const token = localStorage.getItem("token");

  const decoded = token ? jwt_decode(token) : false;

  useEffect(() => {
    dispatch(fetchLessonByName(params.name));
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [dispatch, params.name]);

  const [input, setInput] = useState({
    stars: [],
    description: "",
    userId: decoded.id,
    lessonId: lesson.id,
  });
  const [serverResponse, setServerResponse] = useState("");
  // const [error, setError] = useState({});

  const handleInputChange = (event, id) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput({ ...input, [name]: value, lessonId: id });
  };

  const handlerReview = (event, id) => {
    event.preventDefault();
    axios
      .post(`${URL}/reviews/create`, input)
      .then((res) => {
        console.log(res);
        setServerResponse(res.data.message);
      })
      .catch((error) => {
        console.log(error);
        setServerResponse(error.data);
      });
  };
  const handleAdd = async (id) => {
    try {
      const response = await axios.put(`${URL}/users/addlesson/${id}`, {
        idUser: decoded.id,
      });
      console.log(response.data);
      alert(response.data.exito);
    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data.error);
    }
  };
  return (
    <div>
      <NavBar />
      {Object.keys(lesson).length !== 0 ? (
        lesson.map((lesson) => {
          return (
            <>
              <div className={style.conteinerTodo}>
                <h1 className={style.h1}>{lesson?.name}</h1>
                <h2 className={style.text}>{lesson?.averageStars}</h2>
                <div className={style.fondoinstrYHor}>
                  <div className={style.conjuntoMujerycaja}>
                    <div className={style.fondoMujer}>
                      <img
                        src={lesson?.image}
                        alt="mujer boxeando"
                        className={style.imagenDeporte}
                      />
                    </div>
                  </div>

                  <div className={style.contentHorarios}>
                    <h2 className={style.text}>
                      Dias: {lesson?.scheduleDays?.join(", ")}
                    </h2>
                    <h2 className={style.text}>
                      Horario: {lesson?.scheduleHourStart}hs -{" "}
                      {lesson?.scheduleHourFinish}hs
                    </h2>
                    <h2 className={style.text}>
                      Objetivos: {lesson?.goals?.join(", ")}
                    </h2>
                    <h2 className={style.text}>Intensidad: {lesson?.effort}</h2>
                    <h2 className={style.text}>
                      Tipo de ejercicio: {lesson?.types?.join(", ")}
                    </h2>
                    <h2 className={style.text}>Sucursal: {lesson?.office}</h2>
                  </div>

                  <div className={style.fondoBrad}>
                    <h2 className={style.instructor}>Instructor:</h2>
                    <h2 className={style.instructor}>{lesson?.monitors}</h2>
                    <h2 className={style.instructor}>Añadir clase</h2>
                    <img
                      onClick={() => {
                        handleAdd(lesson.id);
                      }}
                      src={plus}
                      alt="instructor"
                      className={style.img}
                    />
                  </div>
                </div>

                <div className={style.detalleparrafo}>
                  <p className={style.txt}>{lesson.description}</p>
                </div>

                {token ? (
                  <div className={style.card}>
                    <h2>Calificacion: {lesson?.name} </h2>
                    <div className={style.rating}>
                      <input
                        value={5}
                        name="stars"
                        id="star-1"
                        type="radio"
                        onChange={(e) => handleInputChange(e, lesson.id)}
                      />
                      <label for="star-1">
                        <svg
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                            pathLength="360"
                          ></path>
                        </svg>
                      </label>
                      <input
                        value={4}
                        name="stars"
                        id="star-2"
                        type="radio"
                        onChange={(e) => handleInputChange(e, lesson.id)}
                      />
                      <label for="star-2">
                        <svg
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                            pathLength="360"
                          ></path>
                        </svg>
                      </label>
                      <input
                        value={3}
                        name="stars"
                        id="star-3"
                        type="radio"
                        onChange={(e) => handleInputChange(e, lesson.id)}
                      />
                      <label for="star-3">
                        <svg
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                            pathLength="360"
                          ></path>
                        </svg>
                      </label>
                      <input
                        value={2}
                        name="stars"
                        id="star-4"
                        type="radio"
                        onChange={(e) => handleInputChange(e, lesson.id)}
                      />
                      <label for="star-4">
                        <svg
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                            pathLength="360"
                          ></path>
                        </svg>
                      </label>
                      <input
                        value={1}
                        name="stars"
                        id="star-5"
                        type="radio"
                        onChange={(e) => handleInputChange(e, lesson.id)}
                      />
                      <label for="star-5">
                        <svg
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                            pathLength="360"
                          ></path>
                        </svg>
                      </label>
                    </div>

                    <label htmlFor="">Comentario de la clase</label>
                    <input
                      type="text"
                      value={input.description}
                      placeholder="Descripcion"
                      onChange={(e) => handleInputChange(e, lesson.id)}
                      name="description"
                      className={style.text}
                    />

                    <button onClick={handlerReview} className={style.button}>
                      Enviar
                    </button>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>

              <div className={style.PhoneContainer}>
                <h1 className={style.h1}>{lesson?.name}</h1>

                <div className={style.PhoneHorarios}>
                  <h2>
                    {" "}
                    <span>Dias: </span>
                    {lesson?.scheduleDays?.join(", ")}
                  </h2>
                  <h2>
                    <span>Horario: </span> {lesson?.scheduleHourStart}hs -{" "}
                    {lesson?.scheduleHourFinish}hs
                  </h2>
                  <h2>
                    <span>Objetivos: </span> {lesson?.goals?.join(", ")}
                  </h2>
                  <h2>
                    <span>Tipo de ejercicio: </span> {lesson?.types?.join(", ")}
                  </h2>
                  <h2>
                    <span>Sucursal: </span> {lesson?.office}
                  </h2>

                  <div>
                    <div className={style.PhoneInstructorContainer}>
                      <h2>Instructor:</h2>
                      <img src={brad} alt="instructor" className={style.img} />
                    </div>
                    <img
                      src={lesson?.image}
                      alt="mujer boxeando"
                      className={style.imagenDeporte}
                    />

                    {token ? (
                      <div className={style.card}>
                        <h2>Calificacion: {lesson?.name} </h2>
                        <div className={style.rating}>
                          <input
                            value={5}
                            name="stars"
                            id="star-1"
                            type="radio"
                            onChange={(e) => handleInputChange(e, lesson.id)}
                          />
                          <label for="star-1">
                            <svg
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                                pathLength="360"
                              ></path>
                            </svg>
                          </label>
                          <input
                            value={4}
                            name="stars"
                            id="star-2"
                            type="radio"
                            onChange={(e) => handleInputChange(e, lesson.id)}
                          />
                          <label for="star-2">
                            <svg
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                                pathLength="360"
                              ></path>
                            </svg>
                          </label>
                          <input
                            value={3}
                            name="stars"
                            id="star-3"
                            type="radio"
                            onChange={(e) => handleInputChange(e, lesson.id)}
                          />
                          <label for="star-3">
                            <svg
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                                pathLength="360"
                              ></path>
                            </svg>
                          </label>
                          <input
                            value={2}
                            name="stars"
                            id="star-4"
                            type="radio"
                            onChange={(e) => handleInputChange(e, lesson.id)}
                          />
                          <label for="star-4">
                            <svg
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                                pathLength="360"
                              ></path>
                            </svg>
                          </label>
                          <input
                            value={1}
                            name="stars"
                            id="star-5"
                            type="radio"
                            onChange={(e) => handleInputChange(e, lesson.id)}
                          />
                          <label for="star-5">
                            <svg
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                                pathLength="360"
                              ></path>
                            </svg>
                          </label>
                        </div>

                        <label htmlFor="">Comentario de la clase</label>
                        <input
                          type="text"
                          value={input.description}
                          placeholder="Descripcion"
                          onChange={(e) => handleInputChange(e, lesson.id)}
                          name="description"
                          className={style.text}
                        />

                        <button
                          onClick={handlerReview}
                          className={style.button}
                        >
                          Enviar
                        </button>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
              </div>
            </>
          );
        })
      ) : (
        <h1>Cargando datos</h1>
      )}
    </div>
  );
};

export default DetailLesson;
