// src/Pages/homePage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductoCard from '../Components/productoCard';
import { fetchProductos } from '../redux/actions/productoActions';

export default function HomePage({ add, toggle, wish }) {
  const dispatch = useDispatch();
  const { items: productos, status } = useSelector((state) => state.productos);

  useEffect(() => {
    dispatch(fetchProductos());
  }, [dispatch]);

  const destacados = productos.slice(0, 3); // Mismo comportamiento que antes

  return (
    <section className="view active">
      <div className="banner">
        <h2>#SNAKERFACTORY</h2>
        <p>Encuentra tu próximo par de sneakers ⚡</p>
      </div>

      <h3 className="section-title">Destacados</h3>

      {status === 'loading' && <p>Cargando productos...</p>}
      {status === 'failed' && <p>Error al cargar productos</p>}

      <div className="grid">
        {destacados.map(p => (
          <ProductoCard
            key={p.id}
            producto={p}
            inWish={wish.some(w => w.id === p.id)}
            add={add}
            toggle={toggle}
          />
        ))}
      </div>
    </section>
  );
}
