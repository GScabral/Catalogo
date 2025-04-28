import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom'
import ListaProductos from './ListaProductos';
import CreateProductForm from './NewProduct'
import EditProduct from "./EditarProductos.jsx"

function App() {

  return (
    <Routes>
      <Route path='/' element={<ListaProductos />} />
      <Route path='/newProduct/lkmkmlkmsdg/aknalknans/afdasfasfa' element={<CreateProductForm/>} />
      <Route path='/editProcuto/gasgxzxzhsdg/cxzhzfdhfd/dfjndsjj' element={<EditProduct/>} />
    </Routes>
  );
}

export default App;