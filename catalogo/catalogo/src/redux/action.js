import axios from "axios";

export const GET_PRODUCOTOS_REQUEST = 'GET_PRODUCOTOS_REQUEST'
export const GET_PRODUCOTOS_SUCCESS = 'GET_PRODUCOTOS_SUCCESS'
export const GET_PRODUCOTOS_FAILURE = ' GET_PRODUCOTOS_FAILURE'

export const POST_PRODUCTOS_REQUEST = 'POST_PRODUCTOS_REQUEST';
export const POST_PRODUCTOS_SUCCESS = 'POST_PRODUCTOS_SUCCESS';
export const POST_PRODUCTOS_FAILURE = 'POST_PRODUCTOS_FAILURE';


export const getProductos = () => async (dispatch) => {
    dispatch({ type: GET_PRODUCOTOS_REQUEST })

    try {
        const response = await axios.get('http://localhost:3001/productos/listaProducto')
        console.log(response)
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


export const newProduct = (producto) => async (dispatch) => {
    dispatch({ type: POST_PRODUCTOS_REQUEST })

    try {
        const response = await axios.post('http://localhost:3001/productos/ingresarProducto', producto);
        dispatch({
            type: POST_PRODUCTOS_SUCCESS,
            payload: response.data,
        })
    } catch (error) {
        dispatch({
            type: POST_PRODUCTOS_FAILURE,
            payload: error.message,
        })
    }
}
