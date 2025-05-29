import React from 'react';

export default function CarritoPage({ cart, remove, total, checkout }) {
  return (
    <section className="view">
      <h3 className="section-title">Carrito de compras</h3>

      {!cart.length && <div id="cart-empty">Tu carrito está vacío 🛒</div>}

      {cart.map(i=>(
        <div className="item-row" key={i.id}>
          <img src={i.img} alt=""/>
          <div>{i.title}<br/><small>${i.price} × {i.qty}</small></div>
          <button onClick={()=>remove(i.id)}>X</button>
        </div>
      ))}

      {!!cart.length && (
        <div className="summary">
          Total: ${total.toFixed(2)}
          <button onClick={checkout}>Pagar</button>
        </div>
      )}
    </section>
  );
}
