import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src="/path/to/your/logo.png" alt="Logo" />
      </div>
      <nav className="nav">
        <ul className="nav-links">
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#solutions">Solutions</a></li>
          <li><a href="#community">Community</a></li>
          <li><a href="#resources">Resources</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
      <div className="auth-buttons">
        <button className="sign-in">Sign In</button>
        <button className="register">Register</button>
      </div>
    </header>
  );
}

export default Header;