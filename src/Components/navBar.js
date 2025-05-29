import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function NavBar({ cartCount, isLogged, onLogout }) {
  return (
    <header className="navbar">
      <h1 className="logo"><Link to="/">Snaker&nbsp;Factory</Link></h1>
      <nav>
        <NavLink end     to="/"           className="nav-link">Inicio</NavLink>
        <NavLink         to="/productos"  className="nav-link">Productos</NavLink>
        <NavLink         to="/carrito"    className="nav-link">Carrito ({cartCount})</NavLink>
        <NavLink         to="/wishlist"   className="nav-link">Wishlist</NavLink>
        <NavLink         to="/login"      className="nav-link">Login</NavLink>
      </nav>
    </header>
  );
}
