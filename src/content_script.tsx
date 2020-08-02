import { RawBukkenSummary } from './model/models';
import { parseRawBukkenSummary } from './services/parser';

const bukkenListDiv = document.body.querySelector('#js-bukkenList');
const bukkenList = bukkenListDiv?.querySelectorAll('.cassetteitem');

if (bukkenList === null) {
  console.warn('buukenList is null');
}

const rawBukkenSummaries: RawBukkenSummary[] = Array.from(bukkenList!).map((bukken) => {
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

console.log(rawBukkenSummaries);
console.log('parsed', rawBukkenSummaries.map(parseRawBukkenSummary))
