import React, { useState } from 'react';
import { ExternalLink, Search } from 'lucide-react';

export interface InvestigacionConicet {
  id: string;
  titulo: string;
  anio: number;
  autores: Array<{ nombre: string; perfilUrl?: string; fotoUrl?: string; redesPublicas?: string[] }>;
  disciplina: string;
  institucion: string;
  resumen: string;
  resultadosDocumentados: string;
  tipoImpacto: 'salud' | 'tecnologia' | 'economia' | 'ambiente' | 'social' | 'cultural' | 'basico' | 'sin_evaluar';
  evidenciaImpacto: string;
  montoFinanciacionArs: number | null;
  tipoFinanciacion?: string;
  fuenteInvestigacion: string;
  fuenteFinanciacion?: string;
  verificadoEl: string;
}

// No confundir trabajos depositados en repositorios, proyectos financiados y resultados aplicados.
// Se cargan exclusivamente fichas con identificación bibliográfica verificable.
export const INVESTIGACIONES_VERIFICADAS: InvestigacionConicet[] = [];

export default function InventarioConicet() {
  const [q, setQ] = useState('');
  const items = INVESTIGACIONES_VERIFICADAS.filter(x => [x.titulo, x.disciplina, x.institucion, ...x.autores.map(a => a.nombre)].join(' ').toLocaleLowerCase('es-AR').includes(q.toLocaleLowerCase('es-AR')));
  return <section className="space-y-5 rounded-2xl border border-sky-500/30 bg-slate-950/60 p-4 sm:p-6">
    <div className="space-y-2"><p className="text-xs font-bold uppercase tracking-wider text-sky-300">Inventario histórico y actual</p><h3 className="text-2xl font-bold text-white">Investigaciones del CONICET: autores, resultados y financiamiento</h3><p className="text-sm leading-relaxed text-slate-300">Inventario de publicaciones y proyectos desde el primer registro recuperable hasta la actualidad, con trazabilidad de autoría, institución, disciplina, evidencia de resultados y fondos públicos cuando se pueda documentar.</p></div>
    <div className="grid gap-3 sm:grid-cols-3">
      <div className="rounded-xl border border-slate-800 p-3"><p className="text-xs text-slate-400">Investigaciones verificadas incorporadas</p><strong className="text-xl text-white">{INVESTIGACIONES_VERIFICADAS.length}</strong></div>
      <div className="rounded-xl border border-slate-800 p-3"><p className="text-xs text-slate-400">Financiamiento individual identificado</p><strong className="text-xl text-white">{INVESTIGACIONES_VERIFICADAS.filter(x => x.montoFinanciacionArs !== null).length}</strong></div>
      <div className="rounded-xl border border-slate-800 p-3"><p className="text-xs text-slate-400">Cobertura</p><strong className="text-sm text-amber-200">Carga documental pendiente</strong></div>
    </div>
    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-sm text-slate-300 space-y-2"><p><strong className="text-white">Criterio de auditoría:</strong> se documenta por separado impacto comprobado, aplicación potencial, investigación básica y ausencia de evidencia de impacto. No se declara inútil una investigación por ser filosófica, humanística o tener un título llamativo.</p><p>Un salario o una beca personal no equivalen automáticamente al costo del proyecto. Para publicar montos se exige vincular el instrumento de financiamiento, período, beneficiario y fuente original.</p><p>Las fotos y redes de investigadores sólo se incorporan cuando son perfiles profesionales públicos, pertinentes y verificables.</p></div>
    <label className="block text-sm text-slate-300">Buscar investigación, autor o disciplina <span className="mt-2 flex items-center gap-2 rounded-xl border border-slate-700 px-3"><Search size={16}/><input value={q} onChange={e => setQ(e.target.value)} className="w-full bg-transparent py-3 outline-none" placeholder="Ej.: vacunas, filosofía, biotecnología"/></span></label>
    {items.length ? items.map(x => <article key={x.id} className="rounded-xl border border-slate-800 p-4 space-y-2"><h4 className="font-semibold">{x.titulo} ({x.anio})</h4><p className="text-sm text-slate-300">{x.disciplina} · {x.institucion}</p><p className="text-sm">Autoría: {x.autores.map(a => a.nombre).join(', ')}</p><p className="text-sm">{x.resumen}</p><p className="text-sm">Resultados: {x.resultadosDocumentados}</p><p className="text-sm">Impacto: {x.evidenciaImpacto}</p><p className="text-sm">Financiamiento individual: {x.montoFinanciacionArs === null ? 'No verificado' : '$' + x.montoFinanciacionArs.toLocaleString('es-AR')}</p><a href={x.fuenteInvestigacion} target="_blank" rel="noopener noreferrer" className="text-sky-300 underline inline-flex items-center gap-1">Fuente documental <ExternalLink size={13}/></a></article>) : <p className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm text-amber-100">Todavía no se incorporaron fichas individuales verificadas. Este inventario no representa el universo completo del CONICET y no permite calcular porcentajes de utilidad o gasto.</p>}
    <div className="space-y-2 text-sm text-slate-300"><h4 className="font-semibold text-white">Fuentes para la incorporación documental</h4><p><a className="underline text-sky-300" href="https://ri.conicet.gov.ar/" target="_blank" rel="noopener noreferrer">CONICET Digital — repositorio institucional</a> · <a className="underline text-sky-300" href="https://www.conicet.gov.ar/" target="_blank" rel="noopener noreferrer">CONICET — sitio institucional</a>. Se debe verificar cada publicación, proyecto y financiamiento antes de incorporarlo al inventario.</p></div>
  </section>;
}
