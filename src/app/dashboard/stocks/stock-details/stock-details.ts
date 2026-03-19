import {Component, OnInit} from '@angular/core';
import {Api} from '../../../services/api';
import {Router, ActivatedRoute} from '@angular/router';
import {Stock} from '../../../Types/Stock';

@Component({
  selector: 'app-stock-details',
  imports: [],
  templateUrl: './stock-details.html',
  styleUrl: './stock-details.scss',
  standalone: true
})
export class StockDetails implements OnInit{

  stock: Stock | null = null;

  constructor(private  router: Router , private api: Api, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getbyId(+id);
    }
  }

  getbyId(id: number) {
    this.api.show<Stock>('stock', id).subscribe({
      next: (data) => {
        this.stock = data;
      },
      error: (error) => {
        console.error('Error fetching stock details:', error);
      }
    });
  }

}
