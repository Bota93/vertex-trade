/**
 * @file main.tsx
 * @description Punto de entrada principal y configuración del enrutador para la aplicación Vertex Trade.
 * Este archivo se encarga de inicializar React, definir la estructura de navegación de la aplicación
 * y montar el componente raíz en el DOM.
 * @author Tu Nombre
 * @date 2025-09-28
 */

// --- Importaciones de Librerías ---
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// --- Importaciones de Estilos y Componentes ---
import './index.css'; // Estilos globales y directivas de Tailwind CSS.

// Componente "Layout" que contiene la estructura compartida (ej: cabecera).
import App from './App.tsx';
// Componentes que representan cada una de las páginas de la aplicación.
import HomePage from './pages/HomePage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';

/**
 * @const router
 * @description Configuración de las rutas de la aplicación utilizando `createBrowserRouter`.
 * Se define una estructura de rutas anidadas donde:
 * - `App` actúa como el componente "padre" o "layout" para la ruta raíz (`/`).
 * - Las rutas `children` (HomePage, LoginPage, etc.) se renderizarán dentro del componente `App`,
 * en el lugar que ocupe el componente `<Outlet />`.
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // El layout principal se renderiza para todas las rutas hijas.
    children: [
      {
        index: true, // `index: true` designa esta como la ruta por defecto para el path padre ("/").
        element: <HomePage />
      },
      {
        path: 'login', // Se renderizará en la URL "/login".
        element: <LoginPage />
      },
      {
        path: 'register', // Se renderizará en la URL "/register".
        element: <RegisterPage />
      },
    ],
  },
]);

/**
 * Monta la aplicación en el elemento del DOM con el id 'root'.
 * - `React.StrictMode` es un wrapper que ayuda a detectar problemas potenciales en la app.
 * - `RouterProvider` es el componente que provee la configuración del router a toda la aplicación.
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);