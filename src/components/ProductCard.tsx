/**
 * @file ProductCard.tsx
 * @description Componente reutilizable para mostrar la información de un único producto en una tarjeta.
 * @author Tu Nombre
 * @date 2025-09-28
 */

// --- Definiciones de Tipos ---

/**
 * @interface Product
 * @description Define la estructura de datos para un único producto. 
 * Este tipo debe ser consistente con el esquema de la tabla 'products' en la base de datos.
 */
type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
};

/**
 * @interface ProductCardProps
 * @description Define las propiedades (props) que el componente ProductCard espera recibir.
 */
type ProductCardProps = {
    /** * @prop product
     * @description El objeto completo del producto que se va a renderizar en la tarjeta.
     */
    product: Product;
};

// --- Componente React ---

/**
 * Componente funcional que renderiza la tarjeta visual de un único producto.
 * Es un componente de presentación "puro", es decir, su única responsabilidad
 * es mostrar los datos que recibe a través de sus props.
 * * @param {ProductCardProps} props - Las propiedades del componente, que incluyen el objeto `product`.
 * @returns {JSX.Element} Un elemento <article> que representa la tarjeta del producto.
 */
function ProductCard({ product }: ProductCardProps) {
    return (
        // La etiqueta <article> se usa por semántica, ya que una tarjeta de producto
        // es una pieza de contenido independiente y autocontenida.
        <article className="border rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white">
            <img
                src={product.image_url}
                alt={product.name} // El texto 'alt' es crucial para la accesibilidad.
                className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {product.name}
                </h2>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                    {/* Se formatea el precio para que siempre muestre dos decimales. */}
                    {product.price.toFixed(2)} €
                </p>
            </div>
        </article>
    );
}

export default ProductCard;