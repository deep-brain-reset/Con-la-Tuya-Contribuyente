import React, { useMemo, useState } from 'react';
import { ExternalLink, Search } from 'lucide-react';

export interface PautaEstatal {
  id: string;
  organismo: string;
  jurisdiccion: string;
  periodo: string;
  beneficiarioLegal: string;
  medioOCanal: string;
  figura?: string;
  montoArs: number | null;
  montoPersonalArs?: number | null;
  tipo: 'contrato' | 'orden_pago' | 'factura' | 'relevamiento_visual';
  fuenteUrl: string;
  fuenteTitulo: string;
  fechaVerificacion: string;
}

// Sólo incorporar registros individuales con fuente primaria comprobable.
// Una publicidad visible no permite inferir cuánto percibe personalmente un conductor.
export const REGISTROS_PAUTA: PautaEstatal[] = [];

const formato = (n: number) => '$' + n.toLocaleString('es-AR', { maximumFractionDigits: 2 });

export default function PautaPublicitaria() {
  const [query, setQuery] = useState('');
  const records = useMemo(() => REGISTROS_PAUTA.filter(r =>
    [r.organismo, r.jurisdiccion, r.beneficiarioLegal, r.medioOCanal, r.figura || '']
      .join(' ').toLocaleLowerCase('es-AR').includes(query.toLocaleLowerCase('es-AR').trim())
  ), [query]);
  const totalVerificado = records.reduce((n, r) => n + (r.montoArs ?? 0), 0);
  return (
    <section className="space-y-6 max-w-6xl mx-auto">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-widest text-emerald-400">Transparencia del gasto público</p>
        <h1 className="text-3xl font-bold text-white">Pauta publicitaria estatal</h1>
        <p className="text-slate-300 leading-relaxed">Registro documental de campañas, contrataciones y pagos de publicidad oficial de Nación, provincias, CABA, municipios y empresas estatales. Incluye televisión, radio, prensa, sitios web, streaming, redes sociales y creadores de contenido.</p>
      </header>
      <div className="rounded-xl border border-amber-600/30 bg-amber-950/20 p-4 text-sm text-slate-200 space-y-2">
        <p><strong>Regla de atribución:</strong> el beneficiario de un contrato estatal puede ser una empresa, agencia, productora o medio. No se atribuye ese ingreso a un periodista, conductor o creador salvo que exista prueba documental de un pago personal o a su entidad identificada.</p>
        <p>La presencia de anuncios estatales en una transmisión sólo acredita una observación visual en el período relevado; no prueba un pago, su monto, el beneficiario final ni la remuneración del presentador.</p>
        <p>Ausencia de registros cargados no significa ausencia de pauta estatal.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-xl border border-slate-800 p-4"><p className="text-xs text-slate-400">Operaciones verificadas cargadas</p><strong className="text-2xl">{records.length}</strong></div>
        <div className="rounded-xl border border-slate-800 p-4"><p className="text-xs text-slate-400">Total documental cargado (ARS nominales)</p><strong className="text-xl">{formato(totalVerificado)}</strong><p className="text-xs text-slate-500">No representa el gasto estatal total</p></div>
        <div className="rounded-xl border border-slate-800 p-4"><p className="text-xs text-slate-400">Pagos personales comprobados</p><strong className="text-2xl">{records.filter(r => typeof r.montoPersonalArs === 'number').length}</strong></div>
      </div>
      <label className="block text-sm text-slate-300">Buscar organismo, medio o figura
        <span className="mt-2 flex items-center gap-2 rounded-xl border border-slate-700 px-3"><Search size={18} /><input className="w-full bg-transparent py-3 outline-none" value={query} onChange={e => setQuery(e.target.value)} placeholder="Ej.: nombre de un canal o periodista" /></span>
      </label>
      {records.length ? records.map(r => (
        <article key={r.id} className="rounded-xl border border-slate-800 p-4 space-y-2">
          <h2 className="font-semibold">{r.medioOCanal}</h2>
          <p className="text-sm text-slate-300">{r.organismo} · {r.periodo} · {r.jurisdiccion}</p>
          <p className="text-sm">Beneficiario contractual: {r.beneficiarioLegal}</p>
          <p className="text-sm">Monto documentado: {r.montoArs === null ? 'No publicado o no verificable' : formato(r.montoArs)}</p>
          <p className="text-sm">Percepción personal: {typeof r.montoPersonalArs === 'number' ? formato(r.montoPersonalArs) : 'No acreditada'}</p>
          <a className="inline-flex items-center gap-1 text-emerald-400 underline text-sm" href={r.fuenteUrl} target="_blank" rel="noopener noreferrer">{r.fuenteTitulo} <ExternalLink size={13} /></a>
        </article>
      )) : <div className="rounded-xl border border-slate-800 p-6 text-slate-300 text-sm">Todavía no hay pagos individuales documentados y verificados cargados en este módulo. No se muestran estimaciones ni rankings inventados.</div>}
      <div className="text-sm text-slate-300 space-y-2">
        <h2 className="text-lg font-semibold text-white">Cómo se audita</h2>
        <p>Para cada pago: jurisdicción, organismo, campaña, período, expediente, orden de publicidad, proveedor con razón social/CUIT cuando corresponda, monto, moneda, fecha, comprobante y URL de origen. Se distinguen contratos adjudicados, pagos efectivamente realizados y observaciones de anuncios.</p>
        <p>La comparación histórica debe distinguir pesos corrientes y valores ajustados por inflación; no sumar montos de distintos períodos sin explicitar la metodología.</p>
      </div>
    </section>
  );
}
