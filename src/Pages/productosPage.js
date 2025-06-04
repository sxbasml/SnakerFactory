import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductoCard from '../Components/productoCard';
import { fetchProductos } from '../redux/actions/productoActions';
import { crearProducto } from '../Services/productoService';

export default function ProductosPage({ add, toggle, wish }) {
  const dispatch = useDispatch();
  const { items: productos, status } = useSelector((state) => state.productos);

  const [cat, setCat] = useState('all');
  const cats = ['all', 'tenis', 'ropa', 'accesorios', 'gorras'];

  const [modalOpen, setModalOpen] = useState(false);
  const [nuevo, setNuevo] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoriaId: '',
    marca: '',
    talla: '',
    imagenUrl: ''
  });

  useEffect(() => {
    dispatch(fetchProductos());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearProducto({
        ...nuevo,
        precio: parseFloat(nuevo.precio),
        stock: parseInt(nuevo.stock),
        categoriaId: parseInt(nuevo.categoriaId)
      });
      alert('✅ Producto agregado');
      setModalOpen(false);
      setNuevo({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        categoriaId: '',
        marca: '',
        talla: '',
        imagenUrl: ''
      });
      dispatch(fetchProductos());
    } catch (error) {
      console.error('Error al crear producto:', error.response?.data || error.message);
      alert('❌ No se pudo agregar el producto');
    }
  };

  const list = cat === 'all'
    ? productos
    : productos.filter((p) => p.categoriaNombre === cat);

  return (
    <section className="view">
      <h3 className="section-title">Catálogo</h3>

      <button
        onClick={() => setModalOpen(true)}
        style={{
          padding: '10px',
          backgroundColor: '#007bff',
          color: 'white',
          marginBottom: '10px',
          borderRadius: '5px'
        }}
      >
        Agregar nuevo producto
      </button>

      {/* ✅ MODAL */}
      {modalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 999
        }}>
          <form onSubmit={handleSubmit} style={{
            background: 'white', padding: 20, borderRadius: 10, width: 400, display: 'flex',
            flexDirection: 'column', gap: 10
          }}>
            <h3>Nuevo Producto</h3>
            <input placeholder="nombre" value={nuevo.nombre} onChange={e => setNuevo({ ...nuevo, nombre: e.target.value })} required />
            <input placeholder="descripcion" value={nuevo.descripcion} onChange={e => setNuevo({ ...nuevo, descripcion: e.target.value })} required />
            <input placeholder="precio" type="number" value={nuevo.precio} onChange={e => setNuevo({ ...nuevo, precio: e.target.value })} required />
            <input placeholder="stock" type="number" value={nuevo.stock} onChange={e => setNuevo({ ...nuevo, stock: e.target.value })} required />

            {/* 👇 COMBO DE CATEGORÍAS */}
            <select value={nuevo.categoriaId} onChange={e => setNuevo({ ...nuevo, categoriaId: e.target.value })} required>
              <option value="">Selecciona categoría</option>
              <option value="1">Tenis</option>
              <option value="2">Ropa</option>
              <option value="3">Accesorios</option>
              <option value="4">Gorras</option>
            </select>

            <input placeholder="marca" value={nuevo.marca} onChange={e => setNuevo({ ...nuevo, marca: e.target.value })} required />
            <input placeholder="talla" value={nuevo.talla} onChange={e => setNuevo({ ...nuevo, talla: e.target.value })} required />
            <input placeholder="imagenUrl" value={nuevo.imagenUrl} onChange={e => setNuevo({ ...nuevo, imagenUrl: e.target.value })} required />

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button type="submit">Guardar</button>
              <button type="button" onClick={() => setModalOpen(false)}>Cancelar</button>
            </div>
          </form>
        </div>
      )}

      <div className="filters">
        {cats.map(c => (
          <button
            key={c}
            className={`filter ${cat === c ? 'active' : ''}`}
            onClick={() => setCat(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {status === 'loading' && <p>Cargando productos...</p>}
      {status === 'failed' && <p>Error al cargar productos</p>}

      <div className="grid">
        {list.map(p => (
          <ProductoCard
            key={p.id}
            producto={p}
            inWish={wish.some(w => w.id === p.id)}
            add={add}
            toggle={toggle}
          />
        ))}
      </div>
    </section>
  );
}
