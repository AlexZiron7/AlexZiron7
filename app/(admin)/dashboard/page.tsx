import React from 'react';

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-neutral-950 text-neutral-100">
      {/* Sidebar */}
      <aside className="w-64 border-r border-neutral-800 p-6 hidden md:block">
        <h2 className="text-amber-500 font-bold tracking-tighter text-xl mb-12">GOLD & STEEL</h2>
        <nav className="space-y-6">
          {['Dashboard', 'Calendario', 'Servicios', 'Staff', 'Ajustes'].map((item) => (
            <a key={item} href="#" className="block text-neutral-400 hover:text-amber-500 transition-colors">
              {item}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-2xl font-bold">Resumen Diario</h1>
          <div className="flex gap-4">
            <div className="bg-neutral-900 px-4 py-2 rounded-lg border border-neutral-800">
              <p className="text-xs text-neutral-500">Citas Hoy</p>
              <p className="font-bold text-amber-500">24</p>
            </div>
            <div className="bg-neutral-900 px-4 py-2 rounded-lg border border-neutral-800">
              <p className="text-xs text-neutral-500">Ingresos Hoy</p>
              <p className="font-bold text-amber-500">$1,250</p>
            </div>
          </div>
        </header>

        {/* Weekly View Placeholder */}
        <section className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
          <div className="grid grid-cols-4 border-b border-neutral-800 bg-neutral-800/50">
            <div className="p-4 font-medium text-neutral-500 border-r border-neutral-800">Hora</div>
            <div className="p-4 font-medium border-r border-neutral-800 text-center">Marco</div>
            <div className="p-4 font-medium border-r border-neutral-800 text-center">Julian</div>
            <div className="p-4 font-medium text-center">Elias</div>
          </div>
          <div className="h-[600px] overflow-y-auto">
            {[9, 10, 11, 12, 14, 15, 16].map((hour) => (
              <div key={hour} className="grid grid-cols-4 border-b border-neutral-800/50 min-h-[80px]">
                <div className="p-4 text-xs text-neutral-500 border-r border-neutral-800">{hour}:00</div>
                <div className="p-2 border-r border-neutral-800">
                  {hour === 10 && (
                    <div className="bg-amber-500/10 border border-amber-500/20 p-2 rounded text-xs text-amber-500">
                      David R. - Corte
                    </div>
                  )}
                </div>
                <div className="p-2 border-r border-neutral-800"></div>
                <div className="p-2">
                   {hour === 14 && (
                    <div className="bg-amber-500/10 border border-amber-500/20 p-2 rounded text-xs text-amber-500">
                      Alex B. - Afeitado
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
