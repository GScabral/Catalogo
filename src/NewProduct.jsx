import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {CreateNewProduct} from "./redux/action"
import "./NewProduct.css"

const CreateProductForm = ({ onSubmit }) => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        cantidad: "",
        imagen_url: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(CreateNewProduct(formData))
    };

    return (
        <div className="create-product-form-container">
            <h1 className="create-product-form-title">Crear Producto</h1>
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
                    <label>URL de la imagen:</label>
                    <input
                        type="text"
                        name="imagen_url"
                        value={formData.imagen_url}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Crear Producto</button>
            </form>
        </div>
    );
};

export default CreateProductForm;