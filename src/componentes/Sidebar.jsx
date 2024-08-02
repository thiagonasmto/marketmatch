import React from 'react';
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
      <button className="finish-button" onClick={onFinish}>Finish</button>
    </aside>
  );
}

export default Sidebar;
