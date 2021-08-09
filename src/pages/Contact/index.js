import React from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

function Contact() {
  return (
    <div className={styles.contactdiv}>
      <div className={styles.logo}>
        <Link to="/">Clothes Store</Link>
      </div>
      <div className={styles.contactinfodiv}>
        <h2>Contact</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum placeat
          tempore aliquid impedit a eius dolore dicta perspiciatis dolorum sunt!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum placeat
          tempore aliquid impedit a eius dolore dicta perspiciatis dolorum sunt!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum placeat
          tempore aliquid impedit a eius dolore dicta perspiciatis dolorum sunt!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum placeat
          tempore aliquid impedit a eius dolore dicta perspiciatis dolorum sunt!
        </p>
      </div>
      <div className={styles.contactmapdiv}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d191858.64263911126!2d36.17361536897163!3d41.29164656652674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x408877e97607d663%3A0xb939cc265fdeb52!2sSamsun!5e0!3m2!1sen!2str!4v1628412903612!5m2!1sen!2str"
          width="100%"
          height="400"
          title="samsunmap"
          allowfullscreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}

export default Contact;
