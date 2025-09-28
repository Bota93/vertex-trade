/**
 * @file HomePage.tsx
 * @description Componente que representa la página de inicio y el catálogo principal de productos.
 * @author Tu Nombre
 * @date 2025-09-28
 */

// --- Importaciones de Librerías y Componentes ---
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Cliente para la comunicación con Supabase.
import ProductCard from '../components/ProductCard'; // Componente reutilizable para mostrar un producto.

// --- Definiciones de Tipos ---

/**
 * @interface Product
 * @description Define la estructura de datos para un único producto.
 * Es crucial que este tipo coincida con el esquema de la tabla 'products' en la base de datos.
 */
type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
};

// --- Componente React ---

/**
 * Componente funcional para la página principal de la tienda.
 * Su responsabilidad es obtener la lista de productos de la base de datos
 * y renderizarla en una rejilla utilizando el componente `ProductCard`.
 * @returns {JSX.Element} La sección principal de la página con el catálogo de productos.
 */
function HomePage() {
    /**
     * @state products
     * @description Estado que almacena el array de productos obtenidos de Supabase.
     * Se inicializa como un array vacío hasta que la petición de datos se complete.
     */
    const [products, setProducts] = useState<Product[]>([]);

    /**
     * @effect
     * @description Hook que se ejecuta una sola vez después del primer renderizado del componente.
     * Es el encargado de iniciar la carga de datos desde el backend.
     */
    useEffect(() => {
        /**
         * @async
         * @function getProducts
         * @description Función asíncrona que realiza la llamada a Supabase para obtener
         * todos los registros de la tabla 'products'.
         */
        async function getProducts() {
            // Realiza la consulta a la tabla 'products' y selecciona todas sus columnas.
            const { data } = await supabase.from('products').select('*');

            // Si la consulta devuelve datos (no es nulo), se actualiza el estado.
            if (data) {
                setProducts(data);
            }
        }

        // Se invoca la función para iniciar la carga de datos.
        getProducts();
    }, []); // El array de dependencias vacío [] asegura que el efecto se ejecute solo una vez.

    // Renderiza la maquetación de la página.
    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/*
                 * Itera sobre el estado 'products'. Por cada objeto 'product' en el array,
                 * renderiza un componente `ProductCard`, pasándole el producto completo como prop.
                 */}
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default HomePage;