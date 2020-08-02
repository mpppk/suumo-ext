import { BukkenSummary, RawBukkenSummary } from '../model/models';

export const parseRawBukkenSummary = (rawBukkenSummary: RawBukkenSummary): BukkenSummary => {
  return {
    address: rawBukkenSummary.address,
    adminPrice: parseKanjiPrice(rawBukkenSummary.adminPrice),
    deposit: parseKanjiPrice(rawBukkenSummary.deposit),
    gratuity: parseKanjiPrice(rawBukkenSummary.gratuity),
    rentPrice: parseKanjiPrice(rawBukkenSummary.rentPrice)
  };
};

const parseKanjiPrice = (ap: string): number => {
  const price = ap.includes('万円') ?
    Number.parseFloat(ap.replace('万円', '')) * 10000 :
    Number.parseFloat(ap.replace('円', ''));

  return Number.isNaN(price) ? 0 : price;
};

