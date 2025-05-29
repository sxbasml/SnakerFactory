// src/components/ProductoCard.js
import React from 'react';

const ProductoCard = ({ producto }) => {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '10px',
      padding: '10px',
      margin: '10px',
      width: '250px'
    }}>
      <img src={producto.imagenUrl} alt={producto.nombre} style={{ width: '100%' }} />
      <h3>{producto.nombre}</h3>
      <p>{producto.descripcion}</p>
      <p><strong>${producto.precio}</strong></p>
      <p>Categoría: {producto.categoriaNombre}</p>
    </div>
  );
};

export default ProductoCard;
