/**
 * @file App.tsx
 * @description Componente principal y punto de entrada de la aplicación Vertex Trade.
 * @author Tu Nombre
 * @date 2025-09-27
 */

import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import './App.css';

/**
 * @interface Product
 * @description Define la estructura de datos para un único producto, reflejando el esquema de la tabla 'products' en la base de datos.
 */
type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
};

/**
 * Componente principal de la aplicación.
 * Se encarga de obtener el catálogo de productos desde Supabase y renderizar la lista en la página principal.
 * @returns {JSX.Element} El elemento raíz de la aplicación.
 */
function App() {
  /**
   * @state
   * @description Almacena la lista de productos obtenidos de la base de datos.
   * Se inicializa como un array vacío.
   */
  const [products, setProducts] = useState<Product[]>([]);

  /**
   * @effect
   * @description Hook de efecto que se ejecuta una sola vez al montar el componente.
   * Realiza una llamada asíncrona a la API de Supabase para obtener todos los productos
   * y actualizar el estado del componente.
   */
  useEffect(() => {
    /**
     * @async
     * @function getProducts
     * @description Función asíncrona que realiza la petición a la tabla 'products' de Supabase.
     */
    async function getProducts() {
      // Hacemos la petición a la tabla 'products' y seleccionamos todas las columnas.
      const { data } = await supabase.from('products').select('*');

      // Si la petición devuelve datos, se actualiza el estado 'products'.
      if (data) {
        setProducts(data);
      }
    }

    getProducts();
  }, []); // El array de dependencias vacío asegura que el efecto se ejecute solo una vez.

  // Renderiza la estructura principal de la aplicación.
  return (
    <div className="App">
      <header>
        <h1>Vertex Trade</h1>
      </header>
      <main className="product-grid">
        {/*
          * Itera sobre el array de productos en el estado.
          * Por cada producto, renderiza una tarjeta con su información.
          * La 'key' es un atributo especial en React para identificar de forma única cada elemento en una lista.
          */}
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image_url} alt={product.name} />
            <h2>{product.name}</h2>
            {/* Usamos toFixed(2) para asegurar que siempre se muestren dos decimales en el precio. */}
            <p>{product.price.toFixed(2)} €</p>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;