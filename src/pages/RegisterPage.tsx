import { useState } from 'react';
import { supabase } from '../supabaseClient';

function RegisterPage() {
    // Estados para guardar los valores de los inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Estado para mostrar mensajes al usuario (éxito o error)
    const [message, setMessage] = useState('');

    /**
     * Maneja el envío del formulario de registro.
     */
    async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault(); // Evita que la página se recargue al enviar el formulario
        setMessage(''); // Limpia mensajes anteriores

        // Llama a la función de registro de Supabase Auth
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

    return (
        <div className="container mx-auto p-4 flex justify-center">
            <div className="w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6">Crear una Cuenta</h2>
                <form
                    onSubmit={handleRegister}
                    className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
                >
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
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        >
                            Registrarse
                        </button>
                    </div>
                </form>
                {/* Muestra el mensaje de éxito o error */}
                {message && <p className="text-center text-gray-600 text-sm">{message}</p>}
            </div>
        </div>
    );
}

export default RegisterPage;