// ✅ archivo src/Services/userService.js
import api from './api';

export const userService = {
  current() {
    return JSON.parse(localStorage.getItem('user')) ?? null;
  },

  async login(username, password) {
    try {
      const res = await api.post('/api/usuarios/login', {
        nombreUsuario: username,
        contraseña: password
      });

      if (!res || !res.data) {
        return { ok: false, msg: 'Credenciales inválidas' };
      }

      const user = {
        usuarioId: res.data,           // Guardamos el ID como propiedad
        nombreUsuario: username
      };

      localStorage.setItem('user', JSON.stringify(user));
      return { ok: true, user };
    } catch (error) {
      return { ok: false, msg: 'Credenciales inválidas' };
    }
  },

  async register(username, password) {
    try {
      const res = await api.post('/api/usuarios', {
        nombre: username,
        apellidoPaterno: 'N/A',
        apellidoMaterno: 'N/A',
        nombreUsuario: username,
        contraseña: password,
        habilitado: true
      });

      if (!res || !res.data) {
        return { ok: false, msg: 'No se pudo registrar el usuario' };
      }

      return await this.login(username, password);
    } catch (error) {
      if (error.response?.status === 409) {
        return { ok: false, msg: 'El usuario ya existe' };
      }
      return { ok: false, msg: 'No se pudo registrar el usuario' };
    }
  },

  logout() {
    localStorage.removeItem('user');
  }
};
