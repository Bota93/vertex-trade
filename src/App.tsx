import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import ProductCard from './components/ProductCard'; // ¡Importamos nuestro nuevo componente!

// La definición del tipo 'Product' ya no es necesaria aquí,
// porque el componente App no necesita saber su estructura interna, solo pasársela a ProductCard.
// Sin embargo, la mantenemos por ahora para claridad en la llamada a la API.
type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
};

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function getProducts() {
      const { data } = await supabase.from('products').select('*');
      if (data) {
        setProducts(data);
      }
    }
    getProducts();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-md">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold text-gray-800">Vertex Trade</h1>
        </div>
      </header>
      <main className="container mx-auto p-4">
        {/* Aquí la magia de la refactorización: el código es mucho más limpio */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;