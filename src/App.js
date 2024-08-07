import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './telas/Home'; // Verifique o caminho
import ContactPage from './telas/ContactPage'; 
import MatchPage from './telas/MatchPage'; 
import './App.css';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/match" element={<MatchPage />} />
      {/* Opcional: Rota para 404 */}
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  </Router>
);

export default App;
