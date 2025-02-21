export interface iRes<T> {
  code: string
  data: T
  errCode?: string
  msg?: string
  success: boolean
}
