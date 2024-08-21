import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ selectedItems, onFinish }) {
  return (
    <aside className="sidebar">
      <h2>Selected Items</h2>
      <ul>
        {selectedItems.map(item => (
          <li key={item.id_item} className="sidebar-item">
            <img src={item.image} alt={item.nome} className="sidebar-item-image" />
            <div>
              <h3>{item.nome}</h3>
              <p>${item.preco}</p>
            </div>
          </li>
        ))}
      </ul>
      <Link to="#" onClick={(e) => { e.preventDefault(); onFinish(); }}>
        <button className="finish-button">Finish</button>
      </Link>
    </aside>
  );
}

export default Sidebar;
