// Importaciones
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Definimos el componente del archivo
const Home = () => {
  // Definimos los estados que usaremos
  const [productos, setProductos] = useState([]); // Almacena los productos
  const [categorias, setCategorias] = useState([]); // Almacena las categorías de los productos
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(''); // Estado para la categoría seleccionada

  useEffect(() => {
    // Obtener lista de productos
    axios.get('https://api.escuelajs.co/api/v1/products')
      .then(response => {
        setProductos(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });

    // Obtener lista de categorías
    axios.get('https://api.escuelajs.co/api/v1/categories')
      .then(response => {
        setCategorias(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  // Función para manejar cambios en el menú desplegable de categorías
  const handleCategoriaChange = (event) => {
    setCategoriaSeleccionada(event.target.value);
  };

  // Filtrar productos por categoría seleccionada
  const productosFiltrados = categoriaSeleccionada
    ? productos.filter(producto => producto.category.name === categoriaSeleccionada)
    : productos;

  // Renderizado del componente
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Productos de OurStyleStore</h1>

      {/* Menú desplegable de categorías */}
      <div className="mb-3">
        <label htmlFor="categoriaSelect" className="form-label">Filtrar por Categoría:</label>
        <select
          id="categoriaSelect"
          className="form-select"
          value={categoriaSeleccionada}
          onChange={handleCategoriaChange}
        >
          <option value="">Todas las Categorías</option>
          {categorias.map(categoria => (
            <option key={categoria.id} value={categoria.name}>{categoria.name}</option>
          ))}
        </select>
      </div>

      {/* Lista de productos */}
      <div className="row">
        {productosFiltrados.map(producto => (
          <div key={producto.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={process.env.PUBLIC_URL + producto.images[0]} className="card-img-top" alt={producto.title} />
              <div className="card-body">
                <h5 className="card-title">{producto.title}</h5>
                <p className="card-text">{producto.description}</p>
                <p className="card-text">Precio: ${producto.price}</p>
                <p className="card-text">Categoría: {producto.category.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
