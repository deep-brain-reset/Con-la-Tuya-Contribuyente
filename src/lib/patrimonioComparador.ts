/** Comparación entre DDJJ oficiales verificadas; nunca infiere irregularidades. */
export interface DDJJ { periodo:string; activos:number|null; pasivos:number|null; moneda:string; fuenteOficial:string; verificada:boolean; factorPreciosBase?:number; metodologia?:string; }
export type Comparacion = {estado:'comparable'; inicial:number; final:number; diferenciaNominal:number; variacionNominalPct:number|null; diferenciaReal?:number; variacionRealPct?:number|null} | {estado:'no_comparable'; motivo:string};
export function compararPatrimonio(a:DDJJ,b:DDJJ):Comparacion {
 if(!a.verificada||!b.verificada||!a.fuenteOficial||!b.fuenteOficial)return {estado:'no_comparable',motivo:'Falta verificar una o ambas declaraciones juradas oficiales.'};
 if(a.moneda!==b.moneda)return {estado:'no_comparable',motivo:'Las declaraciones usan monedas distintas; se requiere conversión documentada.'};
 if(a.activos===null||a.pasivos===null||b.activos===null||b.pasivos===null)return {estado:'no_comparable',motivo:'Faltan activos o pasivos declarados.'};
 if(![a.activos,a.pasivos,b.activos,b.pasivos].every(Number.isFinite))return {estado:'no_comparable',motivo:'Hay valores numéricos inválidos.'};
 if(a.metodologia&&b.metodologia&&a.metodologia!==b.metodologia)return {estado:'no_comparable',motivo:'Cambió la metodología de valuación; se requiere conciliación.'};
 const inicial=a.activos-a.pasivos,final=b.activos-b.pasivos;
 const out:Extract<Comparacion,{estado:'comparable'}>={estado:'comparable',inicial,final,diferenciaNominal:final-inicial,variacionNominalPct:inicial>0?(final-inicial)/inicial*100:null};
 if(a.factorPreciosBase!==undefined&&b.factorPreciosBase!==undefined&&Number.isFinite(a.factorPreciosBase)&&Number.isFinite(b.factorPreciosBase)&&a.factorPreciosBase>0&&b.factorPreciosBase>0){
 const realA=inicial*a.factorPreciosBase,realB=final*b.factorPreciosBase;
 out.diferenciaReal=realB-realA;out.variacionRealPct=realA>0?(realB-realA)/realA*100:null;
 }
 return out;
}
