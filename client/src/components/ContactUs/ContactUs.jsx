import React, { useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import style from "./ContactUs.module.css";
import { useState } from "react";
import ReactModal from "react-modal";



const ContactUs = () => {
  useEffect(() => {
    window.scrollTo({top: 0, left:0, behavior: 'auto'})
    
}, []);
  const form = useRef();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const openModal = (message) => {
    setModalMessage(message);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_1nzhkew",
        "template_9bl5h2h",
        form.current,
        "ASiDWfbztN_XHNwB9"
      )
      .then(
        (result) => {
          console.log(result.text);
          openModal('Mensaje enviado correctamente')
        },
        (error) => {
          console.log(error.text);
          openModal('Intentelo nuevamente')
        }
      );
    e.target.reset();
  };

  return (
    <main>
      <>
        <section class={style.sectionContact}>
          <div class={style.container}>
            <h1>Contacta a nuestro Equipo!</h1>
            <p>
              Rellene el siguiente formulario para ponerse en contacto con un
              miembro de nuestro equipo. Intentaremos responderle en un plazo de
              48 horas. Si no respondemos en ese plazo, no dude en volver a
              utilizar el formulario.
            </p>
            <form ref={form} onSubmit={sendEmail}>
              <div class={style.formGroup}>
                <label htmlFor="user_name">Nombre completo*</label>
                
                <input
                  type="text"
                  name="user_name"
                  id="user_name"
                  required
                  class={style.formElement}
                  placeholder="John Doe"
                  
                />
              </div>
              <div class={style.formGroup}>
                <label HtmlFor="subject">Asunto*</label>
                
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  required
                  class={style.formElement}
                  placeholder="Asunto"
                  
                />
              </div>
              <div class={style.formGroup}>
                <label htmlFor="user_email">Email*</label>
                
                <input
                  type="email"
                  name="user_email"
                  id="user_email"
                  required
                  class={style.formElement}
                  placeholder="john.doe@example.com"
                  
                />
              </div>
              <div class={style.formGroup}>
                <label HtmlFor="company">Empresa</label>
                <input
                  type="text"
                  name="company"
                  id="company"
                  class={style.formElement}
                  placeholder="john.doe@example.com"
                />
              </div>
              <div class={`${style.formGroup} ${style.full}`}>
                <label htmlFor="message">En que podemos ayudarte?</label>
                <textarea
                  name="message"
                  id="message"
                  class={style.formElement}
                  placeholder="Escribe aqui tu mensaje...."
                  
                ></textarea>
              </div>
              <div class={style.submitGroup}>
                <input type="submit" value="ENVIAR" />
              </div>
            </form>
            <ReactModal isOpen={modalIsOpen} onRequestClose={closeModal} className={style.modal}>
                    <h2 className={style.textModal}>Resultado</h2>
                    <p className={style.textModal}>{modalMessage}</p>
                    <button onClick={closeModal} className={style.SaveButton}>Aceptar</button>
                  </ReactModal>
          </div>
        </section>
      </>
    </main>
  );
};

export default ContactUs;








