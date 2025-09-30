/**
 * @file RegisterPage.tsx
 * @description Componente que renderiza la página de registro de usuarios.
 * Contiene un formulario para que los nuevos usuarios creen una cuenta.
 * @author Bota93
 * @date 2025-09-30
 */

// --- Importaciones de Librerías y Componentes ---
import React, { useState } from 'react'; // Se importa React para el tipado de eventos.
import { supabase } from '../supabaseClient';

/**
 * Componente funcional para la página de registro.
 * Maneja el estado del formulario y la comunicación con Supabase Auth para crear nuevos usuarios.
 * @returns {JSX.Element} El formulario de registro.
 */
function RegisterPage() {
    /**
     * @state email
     * @description Almacena el valor del campo de entrada del correo electrónico.
     */
    const [email, setEmail] = useState('');
    /**
     * @state password
     * @description Almacena el valor del campo de entrada de la contraseña.
     */
    const [password, setPassword] = useState('');
    /**
     * @state message
     * @description Almacena mensajes de feedback para el usuario (éxito o error en el registro).
     */
    const [message, setMessage] = useState('');

    /**
     * @async
     * @function handleRegister
     * @description Manejador de eventos para el envío del formulario.
     * Llama al método `signUp` de Supabase y actualiza el estado `message` con el resultado.
     * @param {React.FormEvent<HTMLFormElement>} e - El evento del formulario.
     */
    async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault(); // Evita la recarga de la página.
        setMessage(''); // Resetea mensajes previos.

        // Intenta registrar al usuario con el email y la contraseña proporcionados.
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            setMessage(`Error: ${error.message}`);
        } else if (data.user) {
            setMessage('¡Registro exitoso! Revisa tu correo electrónico para confirmar tu cuenta.');
        }
    }

    // Renderiza el formulario de registro.
    return (
        <div className="container mx-auto p-4 flex justify-center">
            <div className="w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6">Crear una Cuenta</h2>
                <form
                    onSubmit={handleRegister}
                    className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
                >
                    {/* Campo de Email */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Correo Electrónico
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="tu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    {/* Campo de Contraseña */}
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
                            required
                        />
                    </div>
                    {/* Botón de envío */}
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        >
                            Registrarse
                        </button>
                    </div>
                </form>
                {/* Renderizado condicional del mensaje de feedback */}
                {message && <p className="text-center text-gray-600 text-sm">{message}</p>}
            </div>
        </div>
    );
}

export default RegisterPage;