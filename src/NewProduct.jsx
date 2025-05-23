import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { CreateNewProduct } from "./redux/action";
import "./NewProduct.css";

const CreateProductForm = () => {
    const dispatch = useDispatch();
    const [success, setSuccess] = useState(false);


    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
        categoria:"",
        precio: "",
        cantidad: ""
    });

    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('nombre', formData.nombre);
        data.append('descripcion', formData.descripcion);
        data.append('categoria', formData.categoria);
        data.append('precio', formData.precio);
        data.append('cantidad', formData.cantidad);
        if (file) {
            data.append('imagen', file);
        }

        try {
            await dispatch(CreateNewProduct(data)); // ahora enviamos FormData
            setSuccess(true); // mostrar mensaje de éxito
            // Limpiar el formulario si quieres
            setFormData({
                nombre: "",
                descripcion: "",
                categoria: "",
                precio: "",
                cantidad: ""
            });
            setFile(null);
        } catch (error) {
            console.error('Error al crear producto:', error);
        }
    };
    return (
        <div className="create-product-form-container">
            <h1 className="create-product-form-title">Crear Producto</h1>
            {success && <p className="success-message">¡Producto creado correctamenteee!</p>}
            <form onSubmit={handleSubmit} className="create-product-form">
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Descripción:</label>
                    <textarea
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Categoria:</label>
                    <textarea
                        name="categoria"
                        value={formData.categoria}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Precio:</label>
                    <input
                        type="number"
                        name="precio"
                        value={formData.precio}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Cantidad:</label>
                    <input
                        type="number"
                        name="cantidad"
                        value={formData.cantidad}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Imagen del producto:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <button type="submit">Crear Producto</button>
            </form>
        </div>
    );
};

export default CreateProductForm;
