import React from "react";
import styles from "./ContactUs.module.css";

const ContactUs = () => {
  return (
    <main>
      <section className={styles.sectionContact}>
        <div className={styles.container}>
          <h1 className={styles.Title}>Contact the team!</h1>
          <p>
          Rellene el siguiente formulario para ponerse en contacto con un miembro de nuestro equipo.
          Intentaremos responderle en un plazo de 48 horas. Si no
          respondemos en ese plazo, no dude en volver a utilizar el formulario.
          </p>
          <form>
            <div className={styles.formGroup}>
              <label for="firstname">Nombres*</label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                required
                class={styles.formElement}
                placeholder="John"
              />
            </div>
            <div className={styles.formGroup}>
              <label for="lastname">Apellido*</label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                required
                class={styles.formElement}
                placeholder="Doe"
              />
            </div>
            <div className={styles.formGroup}>
              <label for="email">Email*</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                class={styles.formElement}
                placeholder="john.doe@example.com"
              />
            </div>
            <div className={styles.formGroup}>
              <label for="company">Company</label>
              <input
                type="text"
                name="company"
                id="company"
                class={styles.formElement}
                placeholder="john.doe@example.com"
              />
            </div>
            <div className={`${styles.formGroup} ${styles.full}`}>
              <label for="message">En que podemos ayudarte?</label>
              <textarea
                name="message"
                id="message"
                className={styles.formElement}
                placeholder="Escribe aqui tu mensaje...."
              ></textarea>
            </div>
            <div className={styles.submitGroup}>
              <input type="submit" value="SEND MESSAGE" />
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default ContactUs;
