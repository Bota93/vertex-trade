# Vertex Trade 🛒

Una demo funcional de una aplicación de e-commerce moderna, construida con una arquitectura full-stack y serverless.

---

## 🚀 Demo en Vivo

**[➡️ Ver la aplicación funcionando aquí](https://URL-DE-TU-PROYECTO.com)**

*(Nota: El enlace estará disponible una vez que el proyecto sea desplegado.)*

---

## 💡 Concepto del Proyecto

**Vertex Trade** es un proyecto de portfolio diseñado para simular una experiencia de compra online completa. El objetivo principal es demostrar la habilidad para construir una interfaz de usuario interactiva y conectarla a servicios de backend modernos (BaaS), gestionando datos, usuarios y pagos de forma segura y eficiente.

---

## 📋 Funcionalidades Principales

* **Catálogo de Productos Dinámico:** Los productos se cargan directamente desde una base de datos PostgreSQL y se muestran en una interfaz limpia y responsiva.
* **Autenticación de Usuarios:** Sistema completo de registro e inicio de sesión gestionado a través de **Supabase Auth**.
* **Carrito de la Compra:** Los usuarios pueden añadir, eliminar y modificar la cantidad de productos en su carrito, con un estado que se gestiona en tiempo real en el cliente.
* **Pasarela de Pago Segura:** El proceso de pago se simula de forma segura. El frontend nunca tiene acceso a claves secretas; en su lugar, invoca una **Edge Function** (serverless) que se comunica con la API de **Stripe**.
* **(Próximamente)** Panel de usuario para consultar el historial de pedidos.

---

## 🏗️ Arquitectura y Stack Tecnológico

La arquitectura de este proyecto es serverless, lo que significa que no dependemos de un servidor tradicional. Esto agiliza el desarrollo y mejora la escalabilidad.

`[Usuario] <--> [React App (Frontend)] <--> [Supabase (BaaS)]`

`[React App] --> [Edge Function (para pagos)] --> [API de Stripe]`

* **Frontend:** **React** con **TypeScript** y **Vite**.
    * *¿Por qué?* React para una UI declarativa y basada en componentes. TypeScript para añadir seguridad de tipos y prevenir errores en el desarrollo. Vite por su increíble velocidad.
* **Backend as a Service (BaaS):** **Supabase**.
    * *¿Por qué?* Supabase proporciona la base de datos PostgreSQL, el sistema de autenticación y APIs auto-generadas. Esto permite centrarse en el desarrollo del frontend sin tener que construir un backend desde cero.
* **Pagos Seguros:** **Stripe** + **Supabase Edge Functions**.
    * *¿Por qué?* Para mantener la máxima seguridad, la clave secreta de Stripe se almacena y utiliza exclusivamente dentro de una función serverless. El frontend solo recibe un token temporal y seguro para procesar el pago.

---

## 📸 Galería del Proyecto

---

## 👨‍💻 Autor

**Adrián Alcaraz Rodríguez**
* **GitHub:** `https://github.com/Bota93`
* **LinkedIn:** `https://www.linkedin.com/in/adrianalcarazrodriguez/`