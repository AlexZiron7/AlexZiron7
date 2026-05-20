import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

/**
 * Crea un cliente de Supabase apuntando a un esquema específico (tenant).
 * @param schema Nombre del esquema (ej: 'tenant_slug')
 */
export const createTenantClient = (schema: string) => {
  return createClient(supabaseUrl, supabaseKey, {
    db: { schema }
  });
};

/**
 * Cliente predeterminado para el esquema 'public'.
 */
export const supabase = createClient(supabaseUrl, supabaseKey);
