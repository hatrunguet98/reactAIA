export interface BaseItemModel {
  id: string
  name: string
  type: string
}

export interface BaseItemSearchModel {
  currentPage: number
  pageSize: number
  sortField: string
  sortDirection: string
  textSearch: string
}

export const SORT = {
  ASC: 'ASC',
  DESC: 'DESC',
}