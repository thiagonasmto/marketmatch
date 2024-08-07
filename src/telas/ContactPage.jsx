import React from 'react';
import Header from '../componentes/Header';
import './ContactPage.css';

const ContactPage = () => (
  <div className="contact-page">
    <Header />
    <main>
      <h1>MARKETMATCH</h1>
      <h2>COMPRA INTELIGENTE</h2>
      <form>
        <label>Name</label>
        <input type="text" name="name" />
        <label>Surname</label>
        <input type="text" name="surname" />
        <label>Email</label>
        <input type="email" name="email" />
        <label>Message</label>
        <textarea name="message" />
        <button type="submit">Submit</button>
      </form>
    </main>
  </div>
);

export default ContactPage;
