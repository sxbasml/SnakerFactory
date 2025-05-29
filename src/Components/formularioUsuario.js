import React, { useState } from 'react';

export default function FormularioUsuario({ onAuth }) {
  const [u,setU]=useState(''), [p,setP]=useState(''), [msg,setMsg]=useState('');

  const handle = e=>{
    e.preventDefault();
    const res = onAuth(u.trim(), p.trim());
    setMsg(res.ok ? `Bienvenido ${u}` : res.msg);
  };

  return (
    <form id="auth-form" onSubmit={handle}>
      <input placeholder="Usuario" value={u} onChange={e=>setU(e.target.value)} required/>
      <input type="password" placeholder="Contraseña"
             value={p} onChange={e=>setP(e.target.value)} required/>
      <button type="submit">Ingresar / Registrar</button>
      <p id="auth-msg">{msg}</p>
    </form>
  );
}
