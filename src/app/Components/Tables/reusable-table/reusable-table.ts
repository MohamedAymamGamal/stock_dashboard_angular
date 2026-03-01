import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

export interface TableColumn {
  field: string;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  filterType?: 'text' | 'numeric' | 'date';
  width?: string;
  align?: 'left' | 'center' | 'right';
  template?: boolean;
}

export interface PaginationConfig {
  rows: number;
  rowsPerPageOptions: number[];
  showCurrentPageReport: boolean;
  currentPageReportTemplate: string;
  showFirstLastIcon: boolean;
}

@Component({
  selector: 'app-reusable-table',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './reusable-table.html',
  styleUrls: ['./reusable-table.scss']
})
export class ReusableTableComponent implements OnInit, OnChanges {
    @Input() text : string = '';




  ngOnChanges(changes: SimpleChanges): void {
        throw new Error("Method not implemented.");
    }
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }


}
