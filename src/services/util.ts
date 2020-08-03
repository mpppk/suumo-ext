// 小数点第n桁で四捨五入します
export const ceil = (v: number, n: number) => {
  return Math.ceil( v * Math.pow( 10, n ) ) / Math.pow( 10, n ) ;
};