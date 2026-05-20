-- 1. Crear la tabla de inquilinos en el esquema público
CREATE TABLE IF NOT EXISTS public.tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Función PL/pgSQL para crear esquemas de inquilinos dinámicamente
CREATE OR REPLACE FUNCTION create_tenant_schema(tenant_slug TEXT)
RETURNS VOID AS $$
DECLARE
    schema_name TEXT := 'tenant_' || tenant_slug;
BEGIN
    -- Crear el esquema
    EXECUTE format('CREATE SCHEMA IF NOT EXISTS %I', schema_name);

    -- Crear tabla de Servicios en el nuevo esquema
    EXECUTE format('
        CREATE TABLE IF NOT EXISTS %I.services (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name TEXT NOT NULL,
            duration_minutes INTEGER NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        )', schema_name);

    -- Crear tabla de Staff (Barberos)
    EXECUTE format('
        CREATE TABLE IF NOT EXISTS %I.staff (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID REFERENCES auth.users(id),
            name TEXT NOT NULL,
            role TEXT DEFAULT %L,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        )', schema_name, 'barber');

    -- Crear tabla de Citas (Appointments)
    EXECUTE format('
        CREATE TABLE IF NOT EXISTS %I.appointments (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            staff_id UUID REFERENCES %I.staff(id),
            service_id UUID REFERENCES %I.services(id),
            customer_name TEXT NOT NULL,
            customer_phone TEXT NOT NULL,
            start_time TIMESTAMP WITH TIME ZONE NOT NULL,
            end_time TIMESTAMP WITH TIME ZONE NOT NULL,
            status TEXT DEFAULT %L,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        )', schema_name, schema_name, schema_name, 'pending');

    -- Otorgar permisos básicos
    EXECUTE format('GRANT USAGE ON SCHEMA %I TO authenticated', schema_name);
    EXECUTE format('GRANT ALL ON ALL TABLES IN SCHEMA %I TO authenticated', schema_name);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
