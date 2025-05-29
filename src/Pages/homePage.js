import React from 'react';
import { PRODUCTS } from '../Services/productoService';
import ProductoCard from '../Components/productoCard';

export default function HomePage({ add, toggle, wish }) {
  const featured = PRODUCTS.slice(0, 3);

  return (
    <section className="view active">
      <div className="banner">
        <h2>#SNAKERFACTORY</h2>
        <p>Encuentra tu próximo par de sneakers ⚡</p>
      </div>

      <h3 className="section-title">Destacados</h3>
      <div className="grid">
        {featured.map(p => (
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
