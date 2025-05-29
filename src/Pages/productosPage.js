// src/Pages/productosPage.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductoCard from '../Components/productoCard';
import { fetchProductos } from '../redux/actions/productoActions';

export default function ProductosPage({ add, toggle, wish }) {
  const dispatch = useDispatch();
  const { items: productos, status } = useSelector((state) => state.productos);
  
  const [cat, setCat] = useState('all');
  const cats = ['all', 'tenis', 'ropa', 'accesorios', 'gorras'];

  useEffect(() => {
    dispatch(fetchProductos());
  }, [dispatch]);

  const list = cat === 'all'
    ? productos
    : productos.filter((p) => p.categoriaNombre === cat);

  return (
    <section className="view">
      <h3 className="section-title">Catálogo</h3>

      <div className="filters">
        {cats.map(c => (
          <button
            key={c}
            className={`filter ${cat === c ? 'active' : ''}`}
            onClick={() => setCat(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {status === 'loading' && <p>Cargando productos...</p>}
      {status === 'failed' && <p>Error al cargar productos</p>}

      <div className="grid">
        {list.map(p => (
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
