export interface ResponsivePagination<key> {
  data: key[];
  total: number;
}
export interface QueryArgs {
  id?: string;
  params?: object;
}
