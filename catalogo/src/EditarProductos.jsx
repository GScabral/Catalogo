import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductos, EditProductAction } from './redux/action';
import "./EditProduct.css";

const EditProduct = () => {
    const dispatch = useDispatch();

    const allProductos = useSelector((state) => state.allProductos);
    const loading = useSelector((state) => state.loading);
    const error = useSelector((state) => state.error);

    const [selectedProductId, setSelectedProductId] = useState(null);
    const [productData, setProductData] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        cantidad: '',
        imagen_url: ''
    });
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        dispatch(getProductos());
    }, [dispatch]);

    // Cargar datos del producto cuando cambie el producto seleccionado
    useEffect(() => {
        if (selectedProductId && allProductos.length) {
            const product = allProductos.find(p => p.id === selectedProductId);
            if (product) {
                setProductData({
                    nombre: product.nombre || '',
                    descripcion: product.descripcion || '',
                    precio: product.precio || '',
                    cantidad: product.cantidad || '',
                    imagen_url: product.imagen_url || ''
                });
            }
        }
    }, [selectedProductId, allProductos]);

    const handleChange = (e) => {
        setProductData({
            ...productData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(EditProductAction(selectedProductId, productData));
            setSuccess(true);
            dispatch(getProductos()); // Refrescamos la lista
        } catch (err) {
            console.error('Error al actualizar producto:', err);
        }
    };

    const handleSelectProduct = (id) => {
        setSelectedProductId(id);
        setSuccess(false); // Reseteamos el mensaje de éxito al cambiar de producto
    };

    return (
        <div className="edit-product-container">
            <h2>Lista de Productos</h2>

            {loading && <p>Cargando productos...</p>}
            {error && <p>Error: {error}</p>}

            <table className="product-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {allProductos.map((producto) => (
                        <tr key={producto.id}>
                            <td>{producto.id}</td>
                            <td>{producto.nombre}</td>
                            <td>{producto.precio}</td>
                            <td>{producto.cantidad}</td>
                            <td>
                                <button onClick={() => handleSelectProduct(producto.id)}>
                                    Editar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedProductId && (
                <div className="edit-form">
                    <h2>Editar Producto</h2>
                    {success && <p className="success">Producto actualizado correctamente</p>}
                    <form onSubmit={handleSubmit} className="edit-product-form">
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre"
                            value={productData.nombre}
                            onChange={handleChange}
                            required
                        />
                        <textarea
                            name="descripcion"
                            placeholder="Descripción"
                            value={productData.descripcion}
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            name="precio"
                            placeholder="Precio"
                            value={productData.precio}
                            onChange={handleChange}
                        />
                        <input
                            type="number"
                            name="cantidad"
                            placeholder="Cantidad"
                            value={productData.cantidad}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="imagen_url"
                            placeholder="URL de la imagen"
                            value={productData.imagen_url}
                            onChange={handleChange}
                        />
                        <button type="submit">Guardar Cambios</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default EditProduct;
