import React from "react";
import styles from "./ContactUs.module.css";

const ContactUs = () => {
  return (
    <main>
      <section class={styles.sectionContact}>
        <div class={styles.container}>
          <h1>Contact the team!</h1>
          <p>
            Fill out the form below to get in touch with one of our team
            members. We will try to get back to you within 48 hours. If we do
            not reply within that time please feel free to use the form again.
          </p>

          <form>
            <div class={styles.formGroup}>
              <label for="firstname">First name*</label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                required
                class={styles.formElement}
                placeholder="John"
              />
            </div>
            <div class={styles.formGroup}>
              <label for="lastname">Last name*</label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                required
                class={styles.formElement}
                placeholder="Doe"
              />
            </div>
            <div class={styles.formGroup}>
              <label for="email">Email address*</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                class={styles.formElement}
                placeholder="john.doe@example.com"
              />
            </div>
            <div class={styles.formGroup}>
              <label for="company">Company</label>
              <input
                type="text"
                name="company"
                id="company"
                class={styles.formElement}
                placeholder="john.doe@example.com"
              />
            </div>
            <div class={`${styles.formGroup} ${styles.full}`}>
              <label for="message">What are you looking for?</label>
              <textarea
                name="message"
                id="message"
                class={styles.formElement}
                placeholder="I want..."
              ></textarea>
            </div>
            <div class={styles.submitGroup}>
              <input type="submit" value="SEND MESSAGE" />
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default ContactUs;
