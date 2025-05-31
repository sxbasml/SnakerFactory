// src/components/ProductoCard.js
import React from 'react';

export default function ProductoCard({ producto, inWish, add, toggle }) {
  const prod = {
    ...producto,
    id:    producto.id,
    img:   producto.imagenUrl,
    title: producto.nombre,
    price: producto.precio,
    cat:   producto.categoriaNombre,
  };

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '10px',
      padding: '10px',
      margin: '10px',
      width: '250px'
    }}>
      <img src={prod.imagenURL} alt={prod.title} style={{ width: '100%' }} />
      <h3>{prod.title}</h3>
      <p>{producto.descripcion}</p>
      <p><strong>${prod.price}</strong></p>
      <p>Categoría: {prod.cat}</p>

      {/* Botones de acción */}
      <button onClick={() => add(prod)}>Agregar al carrito</button>
      <button
        style={{ marginLeft: '6px' }}
        onClick={() => toggle(prod)}
      >
        {inWish ? 'Quitar ♥' : 'Wishlist ♥'}
      </button>
    </div>
  );
}
