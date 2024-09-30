export interface IOneUserHistory {
  birthday: number,
  calculator_type: string,
  gender: string,
  name: string,
  timestamp: number
}

export interface IOneInstanceUserHistory{
  history: IOneUserHistory
}

export interface IManyInstanceUserHistory{
  histories: IOneUserHistory[]
}

export type  IManyUserHistory = IOneUserHistory[]