export interface RawBukkenSummary {
  address: string // 住所
  tiku: string // 築年数
  maxFloor: string // 建物の全階数
  stations: string[] // 最寄駅
  floor: string // 階数
  rentPrice: string // 賃料
  adminPrice: string // 管理費
  deposit: string // 敷金
  gratuity: string // 礼金
  madori: string // 間取り
  menseki: string // 占有面積
}

export interface BukkenSummary {
  address: string // 住所
  rentPrice: number // 賃料
  adminPrice: number // 管理費
  deposit: number // 敷金
  gratuity: number // 礼金
}

