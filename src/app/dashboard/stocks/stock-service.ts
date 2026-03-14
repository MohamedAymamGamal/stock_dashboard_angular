import { Injectable } from '@angular/core';
import {Api} from '../../services/api';
import {params} from '../../Types/Params';

@Injectable({
  providedIn: 'root',
})
export class StockService {

  params: params = {pageNumber: 1, pageSize: 10, symbol: '', companyName: '', sortBy: '', isDecsending: false, totalRecords: 1};

  constructor(private api:Api) {}

  getStockAll(){
    this.api.index('stock',this.params)
  }
  getStockById(id:number){
    this.api.show('stock',id)
  }
  // crateStock(){
  //   this.api.store('stock')
  // }
  updateStock(id:number){
    this.api.update('stock',id,this.params)
  }
  deleteStock(id:number){
    this.api.destroy('stock',id);
  }
}
