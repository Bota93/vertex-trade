/**
 * @file App.tsx
 * @description Componente de layout principal de la aplicación Vertex Trade.
 * Renderiza los elementos comunes a todas las páginas, como la cabecera,
 * y proporciona un punto de anclaje para que el router renderice las páginas hijas.
 * @author Tu Nombre
 * @date 2025-09-28
 */

// --- Importaciones de Librerías y Componentes ---
import { Outlet } from 'react-router-dom'; // Componente clave para renderizar rutas anidadas.

/**
 * Componente que actúa como la plantilla o layout principal de la aplicación.
 * Su estructura envuelve a todas las páginas individuales.
 * @returns {JSX.Element} El layout con la cabecera y el contenido de la ruta actual.
 */
function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-md">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold text-gray-800">Vertex Trade</h1>
        </div>
      </header>
      <main>
        {/**
         * @component Outlet
         * @description Este componente de `react-router-dom` actúa como un marcador de posición.
         * En este lugar, el router renderizará el componente de la ruta hija que esté activa.
         * (Ej: HomePage, LoginPage, etc.).
         */}
        <Outlet />
      </main>
    </div>
  );
}

export default App;