import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

function LoginPage() {
    // Mantenemos los estados por si alguien quiere iniciar sesión manualmente
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');

    /**
     * Maneja el envío del formulario de inicio de sesión manual.
     */
    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError('');

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
     * Inicia sesión automáticamente con las credenciales del usuario de demostración.
     */
    async function handleDemoLogin() {
        setError('');

        // Usamos las credenciales que creamos manualmente en Supabase
        const { error } = await supabase.auth.signInWithPassword({
            email: 'demo@ejemplo.com',
            password: 'password123', // La contraseña que establecimos
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
                    {/* El formulario manual se queda igual */}
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
                    <div className="flex flex-col gap-4">
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        >
                            Entrar
                        </button>
                        {/* 👇 BOTÓN NUEVO PARA EL USUARIO DEMO 👇 */}
                        <button
                            type="button" // Importante que sea "button" para no enviar el formulario
                            onClick={handleDemoLogin}
                            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        >
                            Entrar como Usuario Demo
                        </button>
                    </div>
                </form>
                {error && <p className="text-center text-red-500 text-sm">{error}</p>}
            </div>
        </div>
    );
}

export default LoginPage;