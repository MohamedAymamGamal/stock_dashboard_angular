export interface QueryState {
  pageNumber : number;
  pageSize : number;
  symbol : string;
  companyName : string;
  sortBy : string;
  isDecsending : boolean;
}

export const defaultQuery: QueryState = {
  pageNumber : 1,
  pageSize : 10,
  symbol : '',
  companyName : '',
  sortBy : '',
  isDecsending : false,
};

