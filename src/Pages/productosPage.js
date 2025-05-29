// src/pages/ProductosPage.js
import React, { useEffect, useState } from 'react';
import { obtenerProductos } from '../Services/productoService';
import ProductoCard from '../Components/productoCard';

const ProductosPage = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    obtenerProductos()
      .then(data => setProductos(data))
      .catch(error => console.error('Error al obtener productos:', error));
  }, []);

  return (
    <div>
      <h2>Productos Disponibles</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {productos.map(producto => (
          <ProductoCard key={producto.slug} producto={producto} />
        ))}
      </div>
    </div>
  );
};

export default ProductosPage;
