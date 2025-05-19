import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductos, EditProductAction, DeleteProducto } from './redux/action';
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
        categoria: '',
        precio: '',
        cantidad: '',
        imagen_url: ''
    });
    const [file, setFile] = useState(null);
    const [success, setSuccess] = useState(false);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        dispatch(getProductos());
    }, [dispatch]);

    // Cargar datos del producto cuando se selecciona
    useEffect(() => {
        if (selectedProductId && allProductos.length) {
            const product = allProductos.find(p => p.id === selectedProductId);
            if (product) {
                setProductData({
                    nombre: product.nombre || '',
                    descripcion: product.descripcion || '',
                    categoria: product.categoria || '',
                    precio: product.precio || '',
                    cantidad: product.cantidad || '',
                    imagen_url: product.imagen_url || ''
                });
                setFile(null);
            }
        }
    }, [selectedProductId, allProductos]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            // Vista previa inmediata (opcional)
            const reader = new FileReader();
            reader.onload = (ev) => {
                setProductData(prev => ({
                    ...prev,
                    imagen_url: ev.target.result
                }));
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };


    const handleDeleteProduct = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            try {
                await dispatch(DeleteProducto(id));
                alert('Producto eliminado correctamente');
                dispatch(getProductos()); // Refrescar la lista de productos
            } catch (err) {
                console.error('Error al eliminar producto:', err);
                alert('Hubo un error al eliminar el producto. Inténtalo de nuevo.');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedProductId) {
            console.error('No hay producto seleccionado para editar');
            return;
        }
        setUpdating(true);

        try {
            let imagenUrl = productData.imagen_url;

            // Si hay un archivo nuevo, subirlo a Cloudinary
            if (file) {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", "tu_upload_preset"); // Cambia esto por tu preset de Cloudinary

                const res = await fetch("https://api.cloudinary.com/v1_1/tu_cloud_name/image/upload", {
                    method: "POST",
                    body: formData,
                });
                const data = await res.json();
                imagenUrl = data.secure_url;
            }

            // Preparar los datos para enviar
            const updatedData = {
                ...productData,
                imagen_url: imagenUrl
            };

            await dispatch(EditProductAction(selectedProductId, updatedData));
            setSuccess(true);
            setSelectedProductId(null);
            setProductData({
                nombre: '',
                descripcion: '',
                categoria: '',
                precio: '',
                cantidad: '',
                imagen_url: ''
            });
            setFile(null);
            dispatch(getProductos()); // Refrescar lista
        } catch (err) {
            console.error('Error al actualizar producto:', err);
            alert('Hubo un error al actualizar el producto. Inténtalo de nuevo.');
        } finally {
            setUpdating(false);
        }
    };

    const handleSelectProduct = (id) => {
        setSelectedProductId(id);
        setSuccess(false); // Resetear mensaje de éxito
    };

    return (
        <div className="edit-product-container">
            <h2>Lista de Productos</h2>

            {loading && <p>Cargando productos...</p>}
            {error && <p className="error">Error: {error}</p>}

            <table className="product-table">
                <thead>
                    <tr>
                        <th>Imagen</th>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Categoria</th>
                        <th>Cantidad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {allProductos.map((producto) => (
                        <tr key={producto.id}>
                            <td>{<img
                                src={producto.imagen_url}
                                alt={producto.nombre}
                                className="producto-imagen"
                            />}</td>
                            <td>{producto.id}</td>
                            <td>{producto.nombre}</td>
                            <td>{producto.precio}</td>
                            <td>{producto.categoria}</td>
                            <td>{producto.cantidad}</td>
                            <td>
                                <button onClick={() => handleSelectProduct(producto.id)}>
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDeleteProduct(producto.id)}
                                    className="delete-button"
                                >
                                    Eliminar
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
                            type="text"
                            name="categoria"
                            placeholder="Categoria"
                            value={productData.categoria}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="number"
                            name="cantidad"
                            placeholder="Cantidad"
                            value={productData.cantidad}
                            onChange={handleChange}
                        />
                        <div>
                            <label>Imagen del producto:</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            {productData.imagen_url && (
                                <img
                                    src={productData.imagen_url}
                                    alt="Vista previa"
                                    style={{ maxWidth: 100, marginTop: 10 }}
                                />
                            )}
                        </div>
                        <button type="submit" disabled={updating}>
                            {updating ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default EditProduct;
