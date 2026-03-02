import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Paginator} from 'primeng/paginator';

@Component({
  selector: 'app-pagination',
  imports: [
    Paginator
  ],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
  standalone: true
})
export class Pagination  {

  @Input() PageNumber:number = 1;
  @Input() PageSize:number = 10;
  @Input() TotalRecords:number = 0;

  @Output() PageChange = new EventEmitter<number>();


  onPageChange(ev:any){
    this.PageChange.emit(ev);
  }

}
