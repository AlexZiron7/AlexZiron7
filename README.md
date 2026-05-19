# SaaS-Barberia (Multi-Tenant)

SaaS modular para la gestión de reservas y turnos en barberías y salones de belleza, construido con un enfoque de alto rendimiento y escalabilidad.

## 🚀 Tecnologías
- **Next.js 14** (App Router)
- **Supabase** (PostgreSQL)
- **Tailwind CSS**
- **TypeScript**

## 🏗️ Arquitectura de Base de Datos
El sistema utiliza una arquitectura **Multi-Tenant con Esquemas Aislados** (Shared Database, Isolated Schemas) para garantizar la máxima privacidad de datos:

- **Esquema `public`**: Almacena la tabla `tenants` (gestión de dominios/slugs) y la autenticación de usuarios.
- **Esquemas `tenant_[id]`**: Esquemas dinámicos creados para cada barbería que contienen sus tablas propias de `services`, `staff` y `appointments`.

### Inicialización
1. Copia el contenido de `supabase/schema.sql` en el SQL Editor de tu proyecto Supabase.
2. Ejecuta el script para crear la tabla de inquilinos y la función generadora de esquemas.

## 📂 Estructura del Proyecto
- `app/(public)/[tenantSlug]`: Interfaz de reserva para el cliente final.
- `app/(admin)/dashboard`: Panel administrativo para los dueños de barbería.
- `supabase/schema.sql`: Definición de la base de datos y funciones PL/pgSQL.
- `types/database.ts`: Tipado estricto de la base de datos.

## 🛠️ Sprint Actual
- [x] **Paso 1**: Configuración de Base de Datos (SQL & Schemas).
- [x] **Paso 2**: Componente de Selección de Turnos (Public View).
- [x] **Paso 3**: Panel Administrativo (Admin View).
