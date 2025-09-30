/**
 * @file supabaseClient.ts
 * @description Punto central de configuración y exportación del cliente de Supabase.
 * Este archivo inicializa el cliente de Supabase utilizando variables de entorno
 * para mantener seguras las claves de la API.
 * @author Bota93
 * @date 2025-09-30
 */

import { createClient } from "@supabase/supabase-js";

/**
 * @const supabaseUrl
 * @description La URL del proyecto de Supabase. Se obtiene de una variable de entorno
 * para evitar exponerla directamente en el código fuente.
 * @type {string}
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

/**
 * @const supabaseAnonKey
 * @description La clave anónima (pública) del proyecto de Supabase.
 * Permite la interacción con la API desde el lado del cliente de forma segura.
 * @type {string}
 */
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * @const supabase
 * @description La instancia del cliente de Supabase, creada con la URL y la clave anónima.
 * Este objeto será importado en otros componentes para interactuar con la base de datos
 * y los servicios de autenticación de Supabase.
 * @export
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);