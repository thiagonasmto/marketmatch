import React from 'react';
import './Item.css';

function Item({ item, onSelectItem }) {
  return (
    <div className="item">
      <img src={item.image} alt={item.name} className="item-image" />
      <div className="item-details">
        <h2 className='item-name'>{item.name}</h2>
        <p className='item-description'>{item.description}</p>
        <p className='item-price'>${item.price.toFixed(2)}</p>
        <button onClick={() => onSelectItem(item)} className="item-buy-button">Buy</button>
      </div>
    </div>
  );
}

export default Item;
