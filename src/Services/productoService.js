//Aqui deben ir los metodos que llaman a productos

// src/services/productoService.js
import api from './api'; // IMPORTACIÓN EN MINÚSCULAS

export const obtenerProductos = async (nombre = '') => {
  const respuesta = await api.get(`/productos?nombre=${nombre}`);
  return respuesta.data;
};


/* ------------------------------------------
 *  Producto / Carrito / Wishlist – lógico
 * -----------------------------------------*/
const LS = {
  get: (k, fb) => JSON.parse(localStorage.getItem(k)) ?? fb,
  set: (k, v)   => localStorage.setItem(k, JSON.stringify(v)),
};

/* Catálogo hard-coded  */

export const PRODUCTS = [
  {
    id: 1,
    nombre: '31 Hats NY Flames',
    descripcion: 'Caja, gorra, certificado y llavero',
    precio: 1999,
    categoriaNombre: 'gorras',
    imagenUrl: 'https://smileysneakers.com/cdn/shop/files/F360E7B7-E5A8-4174-9BFC-C0A125EC7319.webp?v=1738704953&width=823'
  },
  {
    id: 2,
    nombre: '31 Hats NY Crystals',
    descripcion: 'Caja, gorra, certificado y llavero',
    precio: 2199,
    categoriaNombre: 'gorras',
    imagenUrl: 'https://smileysneakers.com/cdn/shop/files/IMG_7379.jpg?v=1729042295&width=823'
  },
  {
    id: 3,
    nombre: 'SadBoyz “Y LLORO”',
    descripcion: 'Caja, gorra, certificado',
    precio: 2499,
    categoriaNombre: 'gorras',
    imagenUrl: 'https://smileysneakers.com/cdn/shop/files/IMG-3732.png?v=1747451035&width=823'
  },
  {
    id: 4,
    nombre: 'Jordan 1 Mid French Blue',
    descripcion: '',
    precio: 5999,
    categoriaNombre: 'tenis',
    imagenUrl: 'https://smileysneakers.com/cdn/shop/files/BCA7834A-2943-4861-ADCB-17EA862B30F8.png?v=1733620091&width=823'
  },
  {
    id: 5,
    nombre: 'Air Jordan 1 High A Ma Maniere',
    descripcion: '',
    precio: 5499,
    categoriaNombre: 'tenis',
    imagenUrl: 'https://smileysneakers.com/cdn/shop/files/IMG-9213.jpg?v=1733619599&width=823'
  },
];

/* -------- Carrito -------- */
let cart = LS.get('cart', []);
export const cartService = {
  list : ()      => cart,
  add  : p => {                  // p = producto
    const i = cart.find(x=>x.id===p.id);
    i ? i.qty++ : cart.push({...p, qty:1});
    LS.set('cart', cart);        return [...cart];
  },
  remove : id => {
    cart = cart.filter(i=>i.id!==id);
    LS.set('cart', cart);        return [...cart];
  },
  clear : () => { cart=[]; LS.set('cart',cart); return [];},
  total : () => cart.reduce((s,i)=>s+i.price*i.qty,0)
};

/* -------- Wishlist -------- */
let wish = LS.get('wish', []);
export const wishService = {
  list   : () => wish,
  toggle : p => {               // p = producto
    wish.some(w=>w.id===p.id)
      ? wish = wish.filter(w=>w.id!==p.id)
      : wish.push(p);
    LS.set('wish', wish);       return [...wish];
  }
};
