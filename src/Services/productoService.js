// src/Services/productoService.js
import api from './api';

export const obtenerProductos = async (nombre = '') => {
  const respuesta = await api.get(`/productos?nombre=${nombre}`);
  return respuesta.data;
};

// Carrito en localStorage
const LS = {
  get: (k, fb) => JSON.parse(localStorage.getItem(k)) ?? fb,
  set: (k, v)   => localStorage.setItem(k, JSON.stringify(v)),
};

let cart = LS.get('cart', []);
export const cartService = {
  list : ()      => cart,
  add  : p => {
    const i = cart.find(x => x.id === p.id);
    i ? i.qty++ : cart.push({ ...p, qty: 1 });
    LS.set('cart', cart); return [...cart];
  },
  remove : id => {
    cart = cart.filter(i => i.id !== id);
    LS.set('cart', cart); return [...cart];
  },
  clear : () => { cart = []; LS.set('cart', cart); return []; },
  total : () => cart.reduce((s, i) => s + i.price * i.qty, 0)
};

let wish = LS.get('wish', []);
export const wishService = {
  list : () => wish,
  toggle : p => {
    wish.some(w => w.id === p.id)
      ? wish = wish.filter(w => w.id !== p.id)
      : wish.push(p);
    LS.set('wish', wish); return [...wish];
  }
};
