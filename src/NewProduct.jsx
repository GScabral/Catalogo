import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { CreateNewProduct } from "./redux/action";
import "./NewProduct.css";

const CreateProductForm = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('nombre', formData.nombre);
        data.append('descripcion', formData.descripcion);
        data.append('precio', formData.precio);
        data.append('cantidad', formData.cantidad);
        if (file) {
            data.append('imagen', file); // aquí enviamos el archivo
        }

        dispatch(CreateNewProduct(data)); // ahora enviamos FormData
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
