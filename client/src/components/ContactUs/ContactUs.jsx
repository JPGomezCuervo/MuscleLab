import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import styles from "./ContactUs.module.css";


const ContactUs = () => {
  const form = useRef();
  
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_xf4w6mt",
        "template_tlt69s4",
        form.current,
        "1JvIzZUMSo9sa07ae"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };

  return (
    <main>
      <>
        <section class={styles.sectionContact}>
          <div class={styles.container}>
            <h1>Contacta a nuestro Equipo!</h1>
            <p>
              Rellene el siguiente formulario para ponerse en contacto con un
              miembro de nuestro equipo. Intentaremos responderle en un plazo de
              48 horas. Si no respondemos en ese plazo, no dude en volver a
              utilizar el formulario.
            </p>
            <form ref={form} onSubmit={sendEmail}>
              <div class={styles.formGroup}>
                <label htmlFor="user_name">Nombre completo*</label>
                
                <input
                  type="text"
                  name="user_name"
                  id="user_name"
                  required
                  class={styles.formElement}
                  placeholder="John Doe"
                  
                />
              </div>
              <div class={styles.formGroup}>
                <label HtmlFor="subject">Asunto*</label>
                
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  required
                  class={styles.formElement}
                  placeholder="Asunto"
                  
                />
              </div>
              <div class={styles.formGroup}>
                <label htmlFor="user_email">Email*</label>
                
                <input
                  type="email"
                  name="user_email"
                  id="user_email"
                  required
                  class={styles.formElement}
                  placeholder="john.doe@example.com"
                  
                />
              </div>
              <div class={styles.formGroup}>
                <label HtmlFor="company">Empresa</label>
                <input
                  type="text"
                  name="company"
                  id="company"
                  class={styles.formElement}
                  placeholder="john.doe@example.com"
                />
              </div>
              <div class={`${styles.formGroup} ${styles.full}`}>
                <label htmlFor="message">En que podemos ayudarte?</label>
                <textarea
                  name="message"
                  id="message"
                  class={styles.formElement}
                  placeholder="Escribe aqui tu mensaje...."
                  
                ></textarea>
              </div>
              <div class={styles.submitGroup}>
                <input type="submit" value="ENVIAR" />
              </div>
            </form>
          </div>
        </section>
      </>
    </main>
  );
};

export default ContactUs;
