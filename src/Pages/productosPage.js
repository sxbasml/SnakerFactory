import React, { useState } from 'react';
import { PRODUCTS } from '../Services/productoService';
import ProductoCard from '../Components/productoCard';

export default function ProductosPage({ add, toggle, wish }) {
  const [cat, setCat] = useState('all');
  const cats = ['all', 'tenis', 'ropa', 'accesorios', 'gorras'];
  const list = cat === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.categoriaNombre === cat);

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
