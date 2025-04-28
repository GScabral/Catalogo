import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductos } from './redux/action';
import './listaProductos.css';

const ListaProductos = () => {
  const dispatch = useDispatch();

  // Estado global con Redux
  const allProductos = useSelector((state) => state.allProductos);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  // Llama a la acción para obtener productos al montar
  useEffect(() => {
    dispatch(getProductos());
  }, [dispatch]);


  console.log("info:",allProductos)

  return (
    <div className="catalogo">
      <h1 className="titulo">Catálogo de Productos</h1>

      {loading && <p>Cargando productos...</p>}
      {error && <p>Error al cargar productos: {error}</p>}
      {allProductos.length === 0 && !loading && <p>No hay productos disponibles.</p>}

      {allProductos.map((producto) => (
        <div className="producto" key={producto.id}>
          {/* Imagen del producto */}
          <img
            src={`https://catalogo-d1xv.onrender.com/${producto.imagen_url}`}
            alt={producto.nombre}
            className="producto-imagen"
          />

          {/* Información del producto */}
          <div className="producto-info">
            <h4>identificador:{producto.id}</h4>
            <h3>{producto.nombre}</h3>
            <p className="descripcion">{producto.descripcion}</p>
            <p className="detalle">Cantidad: {producto.cantidad}</p>
            <p className="detalle">Precio: ${producto.precio}</p>

          </div>
        </div>
      ))}
    </div>
  );
}

export default ListaProductos;