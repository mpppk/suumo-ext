import { BukkenSummary } from '../models/models';

export const calc2YearPrice = (summary: BukkenSummary): number => {
  // 敷金は含めない
  let price = (summary.rentPrice+summary.adminPrice) * 24;
  price += summary.gratuity;
  price += summary.rentPrice; // 仲介手数料
  return price;
}