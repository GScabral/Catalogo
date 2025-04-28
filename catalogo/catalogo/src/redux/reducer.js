
const intialState = {
    allProductos: [],
    loading: false, // Estado de carga
    error: null, // Manejo de errores
}

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case 'GET_PRODUCOTOS_REQUEST':
            return {
                ...state,
                loading: true,
                error: null
            };
        case 'GET_PRODUCOTOS_SUCCESS':
            return {
                ...state,
                loading: false,
                allProductos: action.payload,
            };
        case 'GET_PRODUCOTOS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case 'POST_PRODUCTOS_REQUEST':
            return {
                ...state,
                loading: true,
                error: null
            };
        case 'POST_PRODUCTOS_SUCCESS':
            return {
                ...state,
                loading: false,
                allProductos: [...state.allProductos, action.payload],
            };
        case 'POST_PRODUCTOS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}



export default reducer;