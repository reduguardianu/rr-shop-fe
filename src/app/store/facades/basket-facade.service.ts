import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { State } from '../reducers';
import * as fromBasketActions from '../actions/basket.actions';
import * as fromBasketSelectors from '../selectors/basket.selectors';
import { Product } from '../../models/product.model';
import { BasketEntry, BasketSimpleEntry, Type } from '../../models/basket.model';

@Injectable({
  providedIn: 'root'
})
export class BasketFacadeService {
  public priceTotal$: Observable<number>;
  public quantityTotal$: Observable<number>;

  public constructor(protected store: Store<State>) {
    this.priceTotal$ = store.pipe(select(fromBasketSelectors.selectPriceTotal));
    this.quantityTotal$ = store.pipe(select(fromBasketSelectors.selectQuantityTotal));
  }

  public add(product: Product, quantity): void {
    this.store.dispatch(fromBasketActions.add({ id: product.id, quantity }));
  }

  public basketEntriesByType$(type: Type): Observable<BasketEntry[]> {
    return this.store.pipe(select(fromBasketSelectors.selectBasketEntries, { type }));
  }

  public getBasketSimpleEntryByProductId(productId: number): BasketSimpleEntry {
    let result: BasketSimpleEntry = null;

    this.store
      .pipe(
        select(fromBasketSelectors.selectBasketSimpleEntryByProductId, { productId }),
        take(1),
        tap((basketSimpleEntry: BasketSimpleEntry): void => {
          result = basketSimpleEntry;
        })
      )
      .subscribe();

    return result;
  }

  public quantityDecrement(id: number): void {
    this.store.dispatch(fromBasketActions.quantityDecrement({ id }));
  }

  public quantityIncrement(id: number): void {
    this.store.dispatch(fromBasketActions.quantityIncrement({ id }));
  }

  public quantitySetTo(id: number, quantity: number): void {
    this.store.dispatch(fromBasketActions.quantitySetTo({ id, quantity }));
  }

  public remove(id: number): void {
    this.store.dispatch(fromBasketActions.remove({ id }));
  }
}
