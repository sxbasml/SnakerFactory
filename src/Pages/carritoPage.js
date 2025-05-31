import React from 'react';
import { orderService } from '../Services/productoService';
import { clearCart } from '../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';

export default function CarritoPage({ cart, remove, total }) {
  const dispatch = useDispatch();

  const handleCheckout = async () => {
    if (!cart.length) {
      alert('Tu carrito está vacío.');
      return;
    }

    const pedido = {
      usuarioId: 1,
      total: cart.reduce((sum, p) => sum + p.price * p.qty, 0),
      estado: 'pendiente',
      detalles: cart.map(p => ({
        productoId: p.id,
        cantidad: p.qty,
        precioUnitario: p.price
      }))
    };

    try {
      console.log("Pedido que se enviará:", pedido);
      await orderService.placeOrder(pedido); // pasamos todo el objeto
      dispatch(clearCart());
      alert('Gracias por tu compra');
    } catch (error) {
      console.error('Detalles del error:', error.response?.data || error.message || error);
      alert('Hubo un problema al procesar tu pedido. Inténtalo más tarde.');
    }
  };

  return (
    <section className="view">
      <h3 className="section-title">Carrito de compras</h3>

      {!cart.length && <div id="cart-empty">Tu carrito está vacío 🛒</div>}

      {cart.map((i, index) => (
        <div className="item-row" key={`${i.id}-${index}`}>
          <img src={i.img} alt="" />
          <div>{i.title}<br /><small>${i.price} × {i.qty}</small></div>
          <button onClick={() => remove(i.id)}>X</button>
        </div>
      ))}

      {!!cart.length && (
        <div className="summary">
          Total: ${total.toFixed(2)}
          <button onClick={handleCheckout}>Pagar</button>
        </div>
      )}
    </section>
  );
}
