/**
 * @file AuthContext.tsx
 * @description Define el contexto de React para la gestión del estado de autenticación en toda la aplicación.
 * Proporciona un componente "Proveedor" (AuthProvider) y un "Hook" personalizado (useAuth)
 * para consumir el estado de la sesión de Supabase de forma global.
 * @author Tu Nombre
 * @date 2025-09-30
 */

// --- Importaciones de Librerías y Tipos ---
import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '../supabaseClient';
import type { Session } from '@supabase/supabase-js';



// --- Definición del Contexto ---

/**
 * @interface AuthContextType
 * @description Define la forma de los datos que nuestro contexto de autenticación proporcionará.
 */
interface AuthContextType {
    session: Session | null;
}

/**
 * @const AuthContext
 * @description Crea el contexto de React. Se inicializa con un valor por defecto que indica
 * que no hay sesión de usuario activa.
 */
export const AuthContext = createContext<AuthContextType>({ session: null });

// --- Componente Proveedor ---

/**
 * @interface AuthProviderProps
 * @description Define las propiedades que el componente AuthProvider espera recibir.
 */
interface AuthProviderProps {
    /**
     * @prop children
     * @description Los componentes hijos que serán envueltos por este proveedor.
     */
    children: ReactNode;
}

/**
 * Componente proveedor que envuelve la aplicación o partes de ella.
 * Se encarga de obtener, mantener y proveer el estado de la sesión de autenticación
 * a todos los componentes que lo consuman.
 * @param {AuthProviderProps} props - Las propiedades del componente, principalmente los `children`.
 * @returns {JSX.Element} El proveedor del contexto con los componentes hijos.
 */
export function AuthProvider({ children }: AuthProviderProps) {
    /**
     * @state session
     * @description Almacena el objeto de la sesión del usuario actual.
     * Es `null` si el usuario no está autenticado.
     */
    const [session, setSession] = useState<Session | null>(null);

    /**
     * @effect
     * @description Hook que se ejecuta una vez al montar el componente.
     * Su responsabilidad es obtener la sesión inicial y suscribirse a los cambios
     * en el estado de autenticación de Supabase.
     */
    useEffect(() => {
        // Intenta obtener la sesión activa al cargar la aplicación.
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        // Se suscribe a los cambios de autenticación (SIGNED_IN, SIGNED_OUT).
        // Cada vez que ocurre un evento, la función callback actualiza el estado de la sesión.
        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        // Función de limpieza: se ejecuta cuando el componente se desmonta.
        // Es crucial para cancelar la suscripción y evitar fugas de memoria.
        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    // Provee el valor de la sesión a todos los componentes hijos.
    return (
        <AuthContext.Provider value={{ session }}>
            {children}
        </AuthContext.Provider>
    );
}