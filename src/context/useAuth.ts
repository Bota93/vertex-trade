import { useContext } from 'react';
import { AuthContext } from './AuthContext'; // Importaremos el contexto del otro archivo

/**
 * Hook personalizado para consumir el contexto de autenticación.
 * Simplifica el acceso a los datos de la sesión desde cualquier componente.
 * @returns El valor actual del contexto de autenticación (la sesión).
 */
export function useAuth() {
    const context = useContext(AuthContext);
    // Esta comprobación asegura que el hook solo se use dentro de un AuthProvider
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}