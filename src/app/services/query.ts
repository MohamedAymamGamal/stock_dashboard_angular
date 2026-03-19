import {inject, Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {distinctUntilChanged, map, Observable, shareReplay} from 'rxjs';
import {defaultQuery, QueryState} from '../Types/query-state';

@Injectable({
  providedIn: 'root',
})
export class Query {
  //dp inject
  private route = inject(ActivatedRoute);
  private  router = inject(Router);

  //observable
  readonly state$: Observable<QueryState> = this.route.queryParams.pipe(
    map(p => this.parse(p)),
    //distinct until changed for performance
    distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),

    //s an RxJS operator used to
    // share a single Observable
    // execution among multiple
    // subscribers and replay the last emitted
    // values to new subscribers
    // :) or :(

    shareReplay(1)
  );
  //take the QueryState types and update
  patch(partial: Partial<QueryState>): void {
    //take the current state and update it with the new values
    const next = { ...this.snapshot(), ...partial };
    if (this.isFilterChange(partial)) next.pageNumber = 1; // auto-reset page
    this.navigate(next);
  }
  //reset the query to default
  reset(): void {
    this.navigate(defaultQuery);
  }
  //parse the current query params
  private snapshot(): QueryState {
    return this.parse(this.route.snapshot.queryParams);
  }
  //parse the current query params to QueryState
  private parse(p: any): QueryState {
    return {
      pageNumber:     +p['pageNumber']      || defaultQuery.pageNumber,
      pageSize:     +p['pageSize']    || defaultQuery.pageSize,
      companyName:   p['companyName'] || '',
      symbol:        p['symbol']      || '',
      sortBy:        p['sortBy']      || '',
      isDecsending:  p['isDecsending'] === 'true'
    };
  }
  //navigate to the new state
  private navigate(state: QueryState): void {
    this.router.navigate([], {
      queryParams: {
        pageNumber:    state.pageNumber,
        pageSize:     state.pageSize,
        companyName:  state.companyName  || null,
        symbol:       state.symbol       || null,
        sortBy:       state.sortBy       || null,
        isDescending: state.isDecsending || null,
      },
      queryParamsHandling: 'merge'
    });
  }
  //apply filter change
  private isFilterChange(partial: Partial<QueryState>): boolean {
    const filterKeys: (keyof QueryState)[] = [
      'companyName', 'symbol', 'sortBy', 'isDecsending'
    ];
    return filterKeys.some(k => k in partial);
  }

}
