import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Injectable,
  OnDestroy,
  OnInit
} from '@angular/core';
import {BehaviorSubject, combineLatest, Subject, switchMap, takeUntil} from 'rxjs';
import {Query} from '../services/query';
import {Api} from '../services/api';

@Injectable({
  providedIn: 'root',

})

export abstract class ListBase  implements  OnInit , OnDestroy {

  protected query  = inject(Query);
  protected api    = inject(Api);
  protected cdr    = inject(ChangeDetectorRef);

  private destroy$ = new Subject<void>();

  private refresh$ = new BehaviorSubject<void>(undefined);

  items:   any[]  = [];
  total:   number = 0;

  abstract  get endpoint(): string;

  ngOnInit(): void {
    combineLatest([
      this.query.state$,
      this.refresh$
    ]).pipe(
      takeUntil(this.destroy$),
      switchMap(([state]) => {
        this.cdr.markForCheck();
        return this.api.index(this.endpoint, state);
      })
    ).subscribe({
      next: (res: any) => {
        this.items   = res.data;
        this.total   = res.totalCount;
        this.cdr.markForCheck();
      },
      error: err => {
        this.cdr.markForCheck();
        console.error(err);
      }
    });
  }

  protected refresh(): void {
    this.refresh$.next();
  }
  onPageChange(pageNumber: number):    void { this.query.patch({ pageNumber }); }
  onSearch(companyName: string): void { this.query.patch({ companyName }); }
  onSort(sortBy: string):        void { this.query.patch({ sortBy }); }
  onReset():                     void { this.query.reset(); }
  trackById(_: number, item: any): number { return item.id; }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
