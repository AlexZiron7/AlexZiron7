import React from 'react';
import { createTenantClient } from '@/lib/supabase';

// Ejemplo de lógica para calcular slots disponibles
function generateTimeSlots(startHour: number, endHour: number, durationMinutes: number) {
  const slots = [];
  let current = new Date();
  current.setHours(startHour, 0, 0, 0);

  const end = new Date();
  end.setHours(endHour, 0, 0, 0);

  while (current < end) {
    slots.push(current.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    current.setMinutes(current.getMinutes() + durationMinutes);
  }
  return slots;
}

export default async function PublicBookingPage({ params }: { params: { tenantSlug: string } }) {
  const schema = `tenant_${params.tenantSlug.replace('-', '_')}`;
  // Nota: En una implementación real, aquí usaríamos createTenantClient(schema)
  // para obtener los servicios reales desde Supabase.

  const slots = generateTimeSlots(9, 18, 45);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-6 md:p-12">
      <header className="mb-12">
        <h1 className="text-3xl font-bold tracking-tighter text-amber-500 uppercase">
          {params.tenantSlug.replace('-', ' ')}
        </h1>
        <p className="text-neutral-400">Reserva tu cita con los mejores profesionales.</p>
      </header>

      <main className="grid md:grid-cols-2 gap-12">
        {/* Paso 1: Servicios */}
        <section>
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <span className="bg-amber-500 text-black px-2 py-0.5 rounded text-sm">1</span>
            Selecciona un Servicio
          </h2>
          <div className="space-y-4">
            {[
              { name: 'Corte Signature', price: 25, time: 45 },
              { name: 'Barba & Perfilado', price: 15, time: 30 },
              { name: 'Afeitado Real', price: 30, time: 60 }
            ].map((service) => (
              <div key={service.name} className="p-4 border border-neutral-800 rounded-lg hover:border-amber-500 cursor-pointer transition-colors group">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium group-hover:text-amber-500">{service.name}</h3>
                  <span className="text-amber-500 font-bold">${service.price}</span>
                </div>
                <p className="text-sm text-neutral-500">{service.time} min</p>
              </div>
            ))}
          </div>
        </section>

        {/* Paso 2: Fecha y Hora */}
        <section className="space-y-12">
          <div>
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="bg-amber-500 text-black px-2 py-0.5 rounded text-sm">2</span>
              Elige Fecha y Hora
            </h2>
            <div className="p-4 border border-neutral-800 rounded-lg">
              <div className="text-center py-8 text-neutral-500 border-b border-neutral-800 mb-6">
                Calendario Interactivo (Mock)
              </div>
              <div className="grid grid-cols-3 gap-2">
                {slots.map((time) => (
                  <button key={time} className="py-2 text-sm border border-neutral-800 rounded hover:bg-amber-500 hover:text-black transition-colors">
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button className="w-full bg-amber-500 text-black font-bold py-4 rounded-lg uppercase tracking-widest hover:bg-amber-400 transition-colors">
            Confirmar Reserva
          </button>
        </section>
      </main>
    </div>
  );
}
