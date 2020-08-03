import { BukkenSummary, RawBukkenSummary } from './models/models';
import { parseRawBukkenSummary } from './services/parser';
import { calc2YearPrice, calcPricePerM2, calcPricePerTsubo } from './services/calculator';
import { ceil } from './services/util';

const main = () => {
  const bukkenListDiv = document.body.querySelector('#js-bukkenList');
  const bukkenList = Array.from(bukkenListDiv?.querySelectorAll('.cassetteitem')!);

  if (bukkenList === null) {
    return
  }

  const rawBukkenSummaries: RawBukkenSummary[] = bukkenList.map((bukken) => {
    const detailRows = bukken.querySelectorAll('.cassetteitem_content-body ul.cassetteitem_detail li');
    const stations = Array.from(detailRows[1].querySelectorAll('div.cassetteitem_detail-text'));
    const [tikuDiv, maxFloorDiv] = Array.from(detailRows[2].querySelectorAll('div'));
    const rows = bukken.querySelectorAll('td');
    const [rentLi, adminLi] = rows[3].querySelectorAll('li');
    const [depositLi, gratuityLi] = rows[4].querySelectorAll('li');
    const [madoriLi, mensekiLi] = rows[5].querySelectorAll('li');
    return {
      address: detailRows[0].textContent!,
      tiku: tikuDiv.textContent!,
      maxFloor: maxFloorDiv.textContent!,
      stations: stations.map((station) => station.textContent!),
      floor: rows[2].textContent!,
      rentPrice: rentLi.textContent!,
      adminPrice: adminLi.textContent!,
      deposit: depositLi.textContent!,
      gratuity: gratuityLi.textContent!,
      madori: madoriLi.textContent!,
      menseki: mensekiLi.textContent!,
    };
  });

  const bukkenSummaries = rawBukkenSummaries.map(parseRawBukkenSummary);

  const create2YearPriceSpan = (bukkenSummary: BukkenSummary) => {
    return createUiPctSpan('2年間支払い合計:' + (calc2YearPrice(bukkenSummary)/10000).toString() + '万円');
  };

  const createUiPctSpan = (text: string): HTMLSpanElement => {
    const span = document.createElement('span');
    span.textContent = text;
    span.classList.add('ui-pct--util1');
    span.classList.add('ui-pct');
    span.style.marginLeft = '8px';
    return span;
  };

  const createPricePerM2Span = (bukkenSummary: BukkenSummary) => {
    const pricePerM2 = ceil(calcPricePerM2(bukkenSummary)/10000, 2);
    return createUiPctSpan(pricePerM2.toString() + '万円/m2:')
  };

  const createPricePerTsuboSpan = (bukkenSummary: BukkenSummary) => {
    const pricePerTsubo = ceil(calcPricePerTsubo(bukkenSummary)/10000, 2);
    return createUiPctSpan(`坪単価:${pricePerTsubo}万円`);
  };

  bukkenList.forEach((bukken, index) => {
    const div = bukken.querySelector('.cassetteitem_content-label');
    if (div === null) {
      console.warn('.cassetteitem_content-label not found');
    }
    div?.appendChild(createPricePerTsuboSpan(bukkenSummaries[index]));
    div?.appendChild(create2YearPriceSpan(bukkenSummaries[index]));
  });

  console.log(rawBukkenSummaries);
  console.log('parsed', bukkenSummaries);
};

main();

