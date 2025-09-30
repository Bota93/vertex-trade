/**
 * @file App.tsx
 * @description Componente de layout principal de la aplicación Vertex Trade.
 * Renderiza los elementos comunes a todas las páginas, como la cabecera dinámica,
 * y proporciona un punto de anclaje para que el router renderice las páginas hijas.
 * @author Tu Nombre
 * @date 2025-09-30
 */

// --- Importaciones de Librerías y Componentes ---
import { Outlet, Link } from 'react-router-dom'; // Componentes para enrutamiento y navegación.
import { useAuth } from './context/useAuth'; // Hook personalizado para acceder al estado de autenticación.
import { supabase } from './supabaseClient'; // Cliente de Supabase para interactuar con la API.

/**
 * Componente que actúa como la plantilla o layout principal de la aplicación.
 * Consume el contexto de autenticación para renderizar una cabecera dinámica.
 * @returns {JSX.Element} El layout con la cabecera y el contenido de la ruta actual.
 */
function App() {
  /**
   * @const session
   * @description Obtiene el estado actual de la sesión del usuario desde el AuthContext.
   * Será un objeto `Session` si el usuario está autenticado, o `null` en caso contrario.
   */
  const { session } = useAuth();

  /**
   * @async
   * @function handleLogout
   * @description Cierra la sesión del usuario actual llamando al método `signOut` de Supabase.
   * El cambio de estado será detectado automáticamente por el AuthContext.
   */
  async function handleLogout() {
    await supabase.auth.signOut();
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-md">
        <div className="container mx-auto p-4 flex justify-between items-center">
          {/* El título principal es un enlace a la página de inicio. */}
          <Link to="/" className="text-3xl font-bold text-gray-800">Vertex Trade</Link>

          <nav>
            {/* Renderizado condicional basado en la existencia de una sesión de usuario. */}
            {session ? (
              // Vista para usuarios autenticados:
              <div className="flex items-center gap-4">
                <span className="text-gray-700">{session.user.email}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Logout
                </button>
              </div>
            ) : (
              // Vista para usuarios no autenticados:
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-gray-700 hover:text-blue-500">
                  Login
                </Link>
                <Link to="/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Registro
                </Link>
              </div>
            )}
          </nav>
        </div>
      </header>
      <main>
        {/* Outlet renderiza el componente de la ruta hija activa. */}
        <Outlet />
      </main>
    </div>
  );
}

export default App;