/**
 * @file LoginPage.tsx
 * @description Componente que renderiza la página de inicio de sesión.
 * Ofrece dos métodos de autenticación: un formulario manual y un botón de acceso rápido para un usuario de demostración.
 * @author Bota93
 * @date 2025-09-30
 */

// --- Importaciones de Librerías y Componentes ---
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

/**
 * Componente funcional para la página de inicio de sesión.
 * Maneja el estado del formulario y dos flujos de autenticación distintos.
 * @returns {JSX.Element} El formulario de inicio de sesión.
 */
function LoginPage() {
    /**
     * @state email
     * @description Almacena el valor del campo de email para el login manual.
     */
    const [email, setEmail] = useState('');
    /**
     * @state password
     * @description Almacena el valor del campo de contraseña para el login manual.
     */
    const [password, setPassword] = useState('');
    /**
     * @state error
     * @description Almacena mensajes de feedback (éxito o error) para el usuario.
     */
    const [error, setError] = useState('');

    /**
     * @async
     * @function handleLogin
     * @description Manejador para el envío del formulario de login manual.
     * @param {React.FormEvent<HTMLFormElement>} e - El evento del formulario.
     */
    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError('');

        // Intenta iniciar sesión con los datos proporcionados en el formulario.
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            setError(`Error: ${error.message}`);
        } else {
            setError('¡Inicio de sesión exitoso!');
        }
    }

    /**
     * @async
     * @function handleDemoLogin
     * @description Manejador para el botón de "Usuario Demo".
     * Inicia sesión con credenciales predefinidas para facilitar la prueba de la aplicación.
     */
    async function handleDemoLogin() {
        setError('');

        // Usa credenciales hardcodeadas del usuario de demostración.
        const { error } = await supabase.auth.signInWithPassword({
            email: 'demo@ejemplo.com',
            password: 'password123',
        });

        if (error) {
            setError(`Error: ${error.message}`);
        } else {
            setError('¡Inicio de sesión como Demo exitoso!');
        }
    }

    return (
        <div className="container mx-auto p-4 flex justify-center">
            <div className="w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6">Iniciar Sesión</h2>
                <form
                    onSubmit={handleLogin}
                    className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
                >
                    {/* Sección de inputs para el login manual */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Correo Electrónico
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="demo@ejemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="******************"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    {/* Sección de botones de acción */}
                    <div className="flex flex-col gap-4">
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        >
                            Entrar
                        </button>
                        <button
                            type="button" // 'type="button"' evita que este botón envíe el formulario.
                            onClick={handleDemoLogin}
                            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        >
                            Entrar como Usuario Demo
                        </button>
                    </div>
                </form>
                {/* Mensaje de feedback para el usuario */}
                {error && <p className="text-center text-red-500 text-sm">{error}</p>}
            </div>
        </div>
    );
}

export default LoginPage;