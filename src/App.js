// src/App.js
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavBar        from './Components/navBar';
import HomePage      from './Pages/homePage';
import ProductosPage from './Pages/productosPage';
import CarritoPage   from './Pages/carritoPage';
import WishlistPage  from './Pages/wishlistPage';
import LoginPage     from './Pages/loginPage';

import {
  cartService,
  wishService
} from './Services/productoService';
import { userService } from './Services/userService';

import './index.css';

export default function App() {
  /* ---------- estado global ---------- */
  const [cart,  setCart ] = useState(cartService.list());
  const [wish,  setWish ] = useState(wishService.list());
  const [user,  setUser ] = useState(userService.current());

  /* ---------- handlers ---------- */
  const addToCart   = prod => setCart(cartService.add(prod));
  const removeCart  = id   => setCart(cartService.remove(id));
  const toggleWish  = prod => setWish(wishService.toggle(prod));
  const checkout    = ()   => { alert('Gracias por tu compra!'); setCart(cartService.clear()); };

  const handleAuth  = (u, p) => {
    const res = userService.login(u, p);
    if (!res.ok) { const r2 = userService.register(u, p); if (!r2.ok) return r2; }
    setUser(userService.current());
    return { ok: true };
  };
  const logout = () => { userService.logout(); setUser(null); };

  /* ---------- render ---------- */
  return (
    <BrowserRouter>
      <NavBar
        cartCount={cart.reduce((s, i) => s + i.qty, 0)}
        isLogged={!!user}
        onLogout={logout}
      />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              add={addToCart}
              toggle={toggleWish}
              wish={wish}
            />
          }
        />
        <Route
          path="/productos"
          element={
            <ProductosPage
              add={addToCart}
              toggle={toggleWish}
              wish={wish}
            />
          }
        />
        <Route
          path="/carrito"
          element={
            <CarritoPage
              cart={cart}
              remove={removeCart}
              total={cartService.total()}
              checkout={checkout}
            />
          }
        />
        <Route
          path="/wishlist"
          element={<WishlistPage wish={wish} toggle={toggleWish} />}
        />
        <Route
          path="/login"
          element={<LoginPage onAuth={handleAuth} />}
        />
      </Routes>
    </BrowserRouter>
  );
}