// Define la estructura de datos para un único producto.
type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
};

// Define las "props" que nuestro componente aceptará.
// En este caso, espera recibir un objeto "product".
type ProductCardProps = {
    product: Product;
};

/**
 * Componente que renderiza la tarjeta de un único producto.
 * @param {ProductCardProps} props - Las propiedades que recibe el componente, incluyendo el objeto producto.
 */
function ProductCard({ product }: ProductCardProps) {
    return (
        <article className="border rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white">
            <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {product.name}
                </h2>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                    {product.price.toFixed(2)} €
                </p>
            </div>
        </article> 
    );
}

export default ProductCard;