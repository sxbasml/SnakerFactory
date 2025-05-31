import React, { useState } from 'react';

export default function FormularioUsuario({ onAuth }) {
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const [msg, setMsg] = useState('');
  const [msgColor, setMsgColor] = useState('black');

  const handle = async (e) => {
    e.preventDefault();

    const res = await onAuth(u.trim(), p.trim());
    
    if (res.ok) {
      setMsg(`✅ Bienvenido ${u}`);
      setMsgColor('green');
    } else {
      setMsg(`❌ ${res.msg || 'Error al iniciar sesión'}`);
      setMsgColor('red');
    }
  };

  return (
    <form id="auth-form" onSubmit={handle}>
      <input
        placeholder="Usuario"
        value={u}
        onChange={(e) => setU(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={p}
        onChange={(e) => setP(e.target.value)}
        required
      />
      <button type="submit">Ingresar / Registrar</button>
      <p id="auth-msg" style={{ color: msgColor, fontWeight: 'bold' }}>{msg}</p>
    </form>
  );
}
