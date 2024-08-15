import React from 'react';
import Header from '../componentes/Header';
import { useNavigate } from 'react-router-dom'; 
import './ContactPage.css';

const ContactPage = () => {
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/itens'); 
  };

  return (
    <div className="contact-page">
      <Header />
      <main>
        <h1>MARKETMATCH</h1>
        <h2>COMPRA INTELIGENTE</h2>
        <form onSubmit={handleSubmit}> 
          <label>Nome</label>
          <input type="text" name="name" />
          <label>Sobrenome</label>
          <input type="text" name="surname" />
          <label>Email</label>
          <input type="email" name="email" />
          <label>Mensagem</label>
          <textarea name="message" />
          <button type="submit">Enviar</button>
        </form>
      </main>
    </div>
  );
};

export default ContactPage;
