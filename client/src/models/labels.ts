export enum labelTypes {
  SAVINGS = 'savings',
  INVESTMENT = 'investment',
  EXPENSE = 'expense',
}

export interface ILabel {
  type: labelTypes
  color: string
  percent: number
}
