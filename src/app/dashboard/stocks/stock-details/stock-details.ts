import {Component, OnInit, signal} from '@angular/core';
import {Api} from '../../../services/api';
import {Router, ActivatedRoute} from '@angular/router';
import {Stock} from '../../../Types/Stock';
import {Card} from 'primeng/card';


@Component({
  selector: 'app-stock-details',
  imports: [
    Card,

  ],
  templateUrl: './stock-details.html',
  styleUrl: './stock-details.scss',
  standalone: true
})
export class StockDetails implements OnInit{

  stock = signal<Stock | null>(null);
  constructor(private  router: Router , private api: Api, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));

      if (!id) return;


      this.api.show<Stock>('stock', id).subscribe({
        next: (data) => this.stock.set(data),
      });
    });
  }




}
