import axios from "axios";


export const GET_PRODUCOTOS_REQUEST = 'GET_PRODUCOTOS_REQUEST'
export const GET_PRODUCOTOS_SUCCESS = 'GET_PRODUCOTOS_SUCCESS'
export const GET_PRODUCOTOS_FAILURE = ' GET_PRODUCOTOS_FAILURE'

export const POST_PRODUCTOS_REQUEST = 'POST_PRODUCTOS_REQUEST';
export const POST_PRODUCTOS_SUCCESS = 'POST_PRODUCTOS_SUCCESS';
export const POST_PRODUCTOS_FAILURE = 'POST_PRODUCTOS_FAILURE';


export const PATCH_PRODUCTOS_REQUEST = 'PATCH_PRODUCTOS_REQUEST';
export const PATCH_PRODUCTOS_SUCCESS = 'PATCH_PRODUCTOS_SUCCESS';
export const PATCH_PRODUCTOS_FAILURE = 'PATCH_PRODUCTOS_FAILURE';


export const getProductos = () => async (dispatch) => {
    dispatch({ type: GET_PRODUCOTOS_REQUEST })

    try {
        const response = await axios.get('https://catalogo-d1xv.onrender.com/productos/listaProducto')
        dispatch({
            type: GET_PRODUCOTOS_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: GET_PRODUCOTOS_FAILURE,
            payload: error.message
        })
    }
}


export const CreateNewProduct = (productoFormData) => async (dispatch) => {
    dispatch({ type: POST_PRODUCTOS_REQUEST });

    try {
        const response = await axios.post(
            'https://catalogo-d1xv.onrender.com/productos/ingresarProducto',
            productoFormData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        dispatch({
            type: POST_PRODUCTOS_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: POST_PRODUCTOS_FAILURE,
            payload: error.message,
        });
    }
};


export const EditProductAction = (id, producto) => async (dispatch) => {
    dispatch({ type: PATCH_PRODUCTOS_REQUEST });

    try {
        const response = await axios.patch(
            `https://catalogo-d1xv.onrender.com/productos/actualizarProducto/${id}`,
            producto
        );
        dispatch({
            type: PATCH_PRODUCTOS_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: PATCH_PRODUCTOS_FAILURE,
            payload: error.message,
        });
    }
};

