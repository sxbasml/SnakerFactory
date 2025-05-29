// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import NavBar        from './Components/navBar';
import HomePage      from './Pages/homePage';
import ProductosPage from './Pages/productosPage';
import CarritoPage   from './Pages/carritoPage';
import WishlistPage  from './Pages/wishlistPage';
import LoginPage     from './Pages/loginPage';

import {
  addToCart,
  removeFromCart,
  clearCart,
} from './redux/slices/cartSlice';
import {
  toggleWish,
} from './redux/slices/wishSlice';
import {
  loginUsuario,
  registerUsuario,
} from './redux/actions/userActions';
import {
  logoutUser,
} from './redux/slices/userSlice';

import './index.css';

export default function App() {
  const dispatch = useDispatch();

  // Acceder al estado desde Redux
  const cart = useSelector((state) => state.cart);
  const wish = useSelector((state) => state.wish);
  const user = useSelector((state) => state.user);

  // Handlers
  const add = (prod) => dispatch(addToCart(prod));
  const remove = (id) => dispatch(removeFromCart(id));
  const toggle = (prod) => dispatch(toggleWish(prod));

  const checkout = () => {
    alert('Gracias por tu compra!');
    dispatch(clearCart());
  };

  const handleAuth = async (u, p) => {
    let result = await dispatch(loginUsuario({ username: u, password: p }));
    if (loginUsuario.rejected.match(result)) {
      result = await dispatch(registerUsuario({ username: u, password: p }));
      if (registerUsuario.rejected.match(result)) return { ok: false, msg: result.payload };
    }
    return { ok: true };
  };

  const logout = () => dispatch(logoutUser());

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
          element={<HomePage add={add} toggle={toggle} wish={wish} />}
        />
        <Route
          path="/productos"
          element={<ProductosPage add={add} toggle={toggle} wish={wish} />}
        />
        <Route
          path="/carrito"
          element={
            <CarritoPage
              cart={cart}
              remove={remove}
              total={cart.reduce((s, i) => s + i.price * i.qty, 0)}
              checkout={checkout}
            />
          }
        />
        <Route
          path="/wishlist"
          element={<WishlistPage wish={wish} toggle={toggle} />}
        />
        <Route
          path="/login"
          element={<LoginPage onAuth={handleAuth} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
