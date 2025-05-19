import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductos } from './redux/action';
import './listaProductos.css';

const ListaProductos = () => {
  const dispatch = useDispatch();

  // Estado global con Redux
  const allProductos = useSelector((state) => state.allProductos);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  // Estados locales
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 6;
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');

  // Llamada a la API
  useEffect(() => {
    dispatch(getProductos());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [paginaActual]);

  // Categorías únicas para el filtro
  const categoriasUnicas = ['Todas', ...new Set(allProductos.map(p => p.categoria))];

  // Filtrar productos por categoría
  const productosFiltrados = allProductos.filter(producto =>
    categoriaSeleccionada === 'Todas' || producto.categoria === categoriaSeleccionada
  );

  // Paginación
  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosActuales = productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto);
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  return (
    <div className="catalogo">
      <h1 className="titulo">CATÁLOGO MAYORISTA - Amore Mio </h1>

      {/* Filtro por categoría */}
      <div className="filtro-categoria">
        <label>Filtrar por categoría: </label>
        <select
          value={categoriaSeleccionada}
          onChange={(e) => {
            setCategoriaSeleccionada(e.target.value);
            setPaginaActual(1); // Reinicia a la página 1
          }}
        >
          {categoriasUnicas.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {loading && <p>Cargando productos...</p>}
      {error && <p>Error al cargar productos: {error}</p>}
      {productosFiltrados.length === 0 && !loading && <p>No hay productos disponibles.</p>}
      <div className="catalogo-grid">
        {productosActuales.map((producto) => (
          <div className="producto" key={producto.id}>
            <img
              src={producto.imagen_url}
              alt={producto.nombre}
              className="producto-imagenlist"
            />
            <div className="producto-info">
              <h4>Identificador: {producto.id}</h4>
              <h3>{producto.nombre}</h3>
              <p className="descripcion">{producto.descripcion}</p>
              {producto.cantidad === 0 ? (
                <p className="sin-stock">Sin stock</p>
              ) : (
                <p className="detalle">Cantidad: {producto.cantidad}</p>
              )}              <p className="detalle">Precio: ${producto.precio}</p>
              <p className="detalle">Categoría: {producto.categoria}</p>
              <a
                className="boton-whatsapp"
                href={`https://wa.me/543794155821?text=${encodeURIComponent(
                  `¡Hola! 👋\n\nEstoy interesado en este producto y me gustaría más información:\n\n🛍️ *Nombre:* ${producto.nombre}\n💰 *Precio:* $${producto.precio}\n🖼️ *Imagen:* ${producto.imagen_url}\n\n¿Está disponible?\nGracias de antemano.`
                )}`}

                target="_blank"
                rel="noopener noreferrer"
              >
                Consultar por WhatsApp
              </a>

            </div>
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div className="paginacion">
        {Array.from({ length: totalPaginas }, (_, index) => (
          <button
            key={index + 1}
            className={paginaActual === index + 1 ? 'activo' : ''}
            onClick={() => setPaginaActual(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ListaProductos;
