import {Component, OnInit, signal} from '@angular/core';
import {Stock} from '../../Types/Stock';
import {ActivatedRoute, Router} from '@angular/router';
import {Api} from '../../services/api';

@Component({
  selector: 'app-setting',
  imports: [],
  templateUrl: './setting.html',
  styleUrl: './setting.scss',
})
export class Setting implements OnInit {
  stock = signal<null>(null);

  constructor(private  router: Router , private api: Api, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.api.index<Stock>('comments').subscribe({
        next: (data:any) => this.stock.set(data),
      });
    });

  }
}
