import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ selectedItems, onFinish }) {
  return (
    <aside className="sidebar">
      <h2>Selected Items</h2>
      <ul>
        {selectedItems.map(item => (
          <li key={item.id} className="sidebar-item">
            <img src={item.image} alt={item.name} className="sidebar-item-image" />
            <div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>${item.price.toFixed(2)}</p>
            </div>
          </li>
        ))}
      </ul>
      <Link to="/match">
        <button className="finish-button" onClick={onFinish}>Finish</button>
      </Link>
    </aside>
  );
}

export default Sidebar;
