import { BukkenSummary } from '../models/models';

export const calc2YearPrice = (summary: BukkenSummary): number => {
  // 敷金は含めない
  let price = (summary.rentPrice+summary.adminPrice) * 24;
  price += summary.gratuity;
  price += summary.rentPrice; // 仲介手数料
  return price;
}

// 1平方メートルあたりの賃料を返します
export const calcPricePerM2 = (summary: BukkenSummary): number => {
  return (summary.rentPrice+summary.adminPrice) / summary.menseki;
}

// 坪単価を返します
export const calcPricePerTsubo = (summary: BukkenSummary): number => {
  return calcPricePerM2(summary) * 3.3;
}
