export interface ITariff {
  tariff: {
    id: number
    title: string
    advantages: string[]
    price: string
    discount?: string
    additional?: string
  } | undefined
}