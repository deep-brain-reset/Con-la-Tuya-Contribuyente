/** Explicaciones orientativas en lenguaje ciudadano. La resolución judicial prevalece. */
export type EstadoJudicial = 'denuncia'|'investigacion'|'procesamiento'|'juicio'|'condena_no_firme'|'condena_firme'|'absolucion_no_firme'|'absolucion_firme'|'sobreseimiento_no_firme'|'sobreseimiento_firme'|'prescripcion'|'otro';
export type CausalSobreseimiento = 'hecho_no_existio'|'persona_no_participo'|'no_es_delito'|'accion_extinguida'|'otra'|'no_verificada';
export interface CausaJudicial { id:string; caratula:string; tribunal:string; expediente?:string; estado:EstadoJudicial; causalSobreseimiento?:CausalSobreseimiento; fundamento?:string; fechaResolucion?:string; fuenteOficial?:string; fechaVerificacion?:string; }
export const ESTADOS:Record<EstadoJudicial,{titulo:string;explicacion:string}>={
 denuncia:{titulo:'Denuncia presentada',explicacion:'Alguien informó un posible hecho a la Justicia. Esto no demuestra que se haya cometido un delito.'},
 investigacion:{titulo:'En investigación',explicacion:'La Justicia reúne y analiza información. Todavía no hay una decisión definitiva sobre responsabilidad penal.'},
 procesamiento:{titulo:'Procesamiento',explicacion:'En los procedimientos que incluyen esta etapa, un juez encontró elementos para continuar el proceso. No es una condena.'},
 juicio:{titulo:'En juicio',explicacion:'Un tribunal examina la acusación y las pruebas. La persona mantiene la presunción de inocencia.'},
 condena_no_firme:{titulo:'Condena no firme',explicacion:'Se dictó una condena que todavía puede ser revisada. No debe presentarse como definitiva.'},
 condena_firme:{titulo:'Condena firme',explicacion:'La condena quedó firme según la constancia judicial. Consultá la sentencia para conocer los hechos y la pena.'},
 absolucion_no_firme:{titulo:'Absolución no firme',explicacion:'El tribunal absolvió a la persona, pero la decisión todavía puede ser revisada.'},
 absolucion_firme:{titulo:'Absolución firme',explicacion:'La absolución quedó firme. Los motivos concretos figuran en la resolución.'},
 sobreseimiento_no_firme:{titulo:'Sobreseimiento no firme',explicacion:'Se dispuso cerrar el proceso respecto de esta persona por un motivo legal, pero la decisión puede revisarse.'},
 sobreseimiento_firme:{titulo:'Sobreseimiento firme',explicacion:'El cierre del proceso respecto de esta persona quedó firme. El motivo debe consultarse en la resolución.'},
 prescripcion:{titulo:'Prescripción',explicacion:'La Justicia determinó que transcurrió el plazo legal para perseguir el hecho. No establece por sí sola si ocurrió o quién fue responsable.'},
 otro:{titulo:'Estado sin verificar',explicacion:'Todavía falta documentación suficiente para explicar el estado de la causa.'}
};
export const CAUSALES:Record<CausalSobreseimiento,string>={
 hecho_no_existio:'El tribunal concluyó que el hecho investigado no existió, según la resolución.',
 persona_no_participo:'El tribunal concluyó que esta persona no participó en el hecho.',
 no_es_delito:'El tribunal concluyó que el hecho examinado no constituye un delito.',
 accion_extinguida:'La acción penal terminó por una causa legal. Esto no determina por sí solo si el hecho ocurrió.',
 otra:'La resolución identifica otra causal. Consultá sus fundamentos.',
 no_verificada:'La causal concreta todavía no fue verificada en una resolución judicial.'
};
export function explicarCausa(causa:CausaJudicial) {
 const estado=ESTADOS[causa.estado];
 const causal=causa.estado.startsWith('sobreseimiento')?CAUSALES[causa.causalSobreseimiento??'no_verificada']:undefined;
 return {titulo:estado.titulo,explicacion:estado.explicacion,causal,nota:causa.fuenteOficial?'Consultá el documento original: este resumen no reemplaza el fallo.':'No se cargó una resolución oficial verificada. La falta de registros no significa que no existan causas.'};
}
