/**
 * @file main.tsx
 * @description Punto de entrada principal y configuración del enrutador para la aplicación Vertex Trade.
 * Este archivo se encarga de inicializar React, definir la estructura de navegación
 * y montar la aplicación en el DOM, envolviéndola con los proveedores necesarios.
 * @author Bota93
 * @date 2025-09-30
 */

// --- Importaciones de Librerías ---
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// --- Importaciones de Estilos y Componentes ---
import './index.css'; // Estilos globales y directivas de Tailwind CSS.

import App from './App'; // El componente Layout principal.
import HomePage from './pages/HomePage'; // Página del catálogo de productos.
import LoginPage from './pages/LoginPage'; // Página de inicio de sesión.
import RegisterPage from './pages/RegisterPage'; // Página de registro.
import { AuthProvider } from './context/AuthContext'; // Proveedor del contexto de autenticación.

/**
 * @const router
 * @description Define la configuración de rutas de la aplicación.
 * La estructura anidada designa a `App` como un layout persistente para las rutas hijas.
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // `App` se renderiza siempre.
    children: [ // Las rutas hijas se renderizan dentro del <Outlet /> de App.
      {
        index: true, // Ruta por defecto para '/'.
        element: <HomePage />
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'register',
        element: <RegisterPage />
      },
    ],
  },
]);

/**
 * Monta la aplicación en el elemento del DOM con el id 'root'.
 * - `AuthProvider` envuelve la app para proveer el estado de la sesión.
 * - `RouterProvider` provee la configuración del router.
 * - `React.StrictMode` activa comprobaciones adicionales en desarrollo.
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);