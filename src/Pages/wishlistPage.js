import React from 'react';

export default function WishlistPage({ wish, toggle }) {
  return (
    <section className="view">
      <h3 className="section-title">Wishlist</h3>

      {!wish.length && <div id="wish-empty">Aún no agregas productos ❤️</div>}

      {wish.map(i => (
        <div className="item-row" key={i.id}>
          <img src={i.img} alt="" />
          <div>{i.title} - ${i.price}</div>
          <button onClick={() => toggle(i)}>Quitar</button>
        </div>
      ))}
    </section>
  );
}
