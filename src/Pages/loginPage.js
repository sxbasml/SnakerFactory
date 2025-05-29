import React from 'react';
import FormularioUsuario from '../Components/formularioUsuario';

export default function LoginPage({ onAuth }) {
  return (
    <section className="view">
      <h3 className="section-title">Login / Registro</h3>
      <FormularioUsuario onAuth={onAuth}/>
    </section>
  );
}
