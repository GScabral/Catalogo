import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductos } from './redux/action';
import './App.css';

function App() {
  const dispatch = useDispatch();

  // Estado global con Redux
  const allProductos = useSelector((state) => state.allProductos);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  // Llama a la acción para obtener productos al montar
  useEffect(() => {
    dispatch(getProductos());
  }, [dispatch]);

  return (
    <div className="catalogo">
      <h1 className="titulo">Catálogo de Productos</h1>

      {loading && <p>Cargando productos...</p>}
      {error && <p>Error al cargar productos: {error}</p>}
      {allProductos.length === 0 && !loading && <p>No hay productos disponibles.</p>}

      {allProductos.map((producto) => (
        <div className="producto" key={producto.id}>
          {/* Imagen del producto */}
          <img src={producto.imagen} alt={producto.nombre} className="producto-imagen" />

          {/* Información del producto */}
          <div className="producto-info">
            <h3>{producto.nombre}</h3>
            <p className="descripcion">{producto.descripcion}</p>
            <p className="detalle">Talles: {producto.talles?.join(', ')}</p>
            <div className="colores">
              <span style={{ backgroundColor: producto.colorPrincipal }}></span>
              <span style={{ backgroundColor: producto.colorSecundario }}></span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;