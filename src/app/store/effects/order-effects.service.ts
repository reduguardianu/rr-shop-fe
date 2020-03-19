import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, filter, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import * as fromBarActions from '../actions/bar.actions';
import * as fromOrderActions from '../actions/order.actions';
import * as fromRouterActions from '../actions/router.actions';
import { ApiProductService } from '../../rest-api/product/api-product.service';
import { OrderFacadeService } from '../facades/order-facade.service';
import { OrderStore } from '../../models/order.model';
import { ApiOrderService } from '../../rest-api/order/api-order.service';
import { POTENTIAL_ORDER_ID } from '../reducers/order.reducers';
import { PromoCode, PromoCodeStore } from '../../models/promo-code.model';
import { ApiPromoCodeService } from '../../rest-api/promo-code/api-promo-code.service';

@Injectable()
export class OrderEffects {
  public triggerOrderRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRouterActions.customRouterNavigated),
      concatMap(action => of(action).pipe(withLatestFrom(this.orderFacadeService.isOnOrderRoute$))),
      filter(([action, isOnOrderRoute]): boolean => isOnOrderRoute),
      map(() => fromOrderActions.orderRequest())
    )
  );

  public orderRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOrderActions.orderRequest),
      concatMap(action => of(action).pipe(withLatestFrom(this.orderFacadeService.urlOrderUuid$))),
      switchMap(([action, urlOrderUuid]) =>
        this.apiOrderService.getOrder(urlOrderUuid).pipe(
          map((orderStore: OrderStore) => fromOrderActions.orderSuccess({ orderStore })),
          catchError((httpErrorResponse: HttpErrorResponse) => of(fromOrderActions.orderFailure({ httpErrorResponse })))
        )
      )
    )
  );

  // ---------------------------------------------------------------------------

  public createOrderRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOrderActions.createOrderRequest),
      concatMap(action =>
        of(action).pipe(withLatestFrom(this.orderFacadeService.orderByUuid$(`${POTENTIAL_ORDER_ID}`)))
      ),
      switchMap(([action, order]) =>
        this.apiOrderService.createOrder(order).pipe(
          map((orderStore: OrderStore) => fromOrderActions.createOrderSuccess({ orderStore })),
          catchError((httpErrorResponse: HttpErrorResponse) =>
            of(fromOrderActions.createOrderFailure({ httpErrorResponse }))
          )
        )
      )
    )
  );

  // https://stackoverflow.com/questions/50566128/angular-router-navigation-inside-ngrx-effect
  public createOrderSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromOrderActions.createOrderSuccess),
        tap(action => {
          this.router.navigate(['/order', action.orderStore.uuid]).then();
        })
      ),
    { dispatch: false }
  );

  public createOrderFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOrderActions.createOrderFailure),
      map(() => fromBarActions.showError({ message: `Wystąpił błąd podczas składania zamówienia` }))
    )
  );

  // ---------------------------------------------------------------------------

  public triggerPotentialOrderRequests$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRouterActions.customRouterNavigated),
      concatMap(action => of(action).pipe(withLatestFrom(this.orderFacadeService.isOnPotentialOrderRoute$))),
      filter(([action, isOnPotentialOrderRoute]): boolean => isOnPotentialOrderRoute),
      mergeMap(() => [fromOrderActions.potentialOrderProductsRequest(), fromOrderActions.promoCodeRequest()])
    )
  );

  public potentialOrderProductsRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOrderActions.potentialOrderProductsRequest),
      concatMap(action => of(action).pipe(withLatestFrom(this.orderFacadeService.potentialOrderProductsIds$))),
      switchMap(([action, potentialOrderProductsIds]) =>
        this.apiProductService.getProducts(potentialOrderProductsIds).pipe(
          map(products => fromOrderActions.potentialOrderProductsSuccess({ products })),
          catchError((httpErrorResponse: HttpErrorResponse) =>
            of(fromOrderActions.potentialOrderProductsFailure({ httpErrorResponse }))
          )
        )
      )
    )
  );

  public potentialOrderPromoCodeRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOrderActions.promoCodeRequest),
      concatMap(action =>
        of(action).pipe(withLatestFrom(this.orderFacadeService.promoCodeTextFieldByUuid$(`${POTENTIAL_ORDER_ID}`)))
      ),
      switchMap(([action, promoCodeTextField]) =>
        this.apiPromoCodeService.getPromoCode(promoCodeTextField).pipe(
          map((promoCodeStore: PromoCodeStore) => fromOrderActions.promoCodeSuccess({ promoCodeStore })),
          catchError((httpErrorResponse: HttpErrorResponse) =>
            of(fromOrderActions.promoCodeFailure({ httpErrorResponse }))
          )
        )
      )
    )
  );

  public constructor(
    private actions$: Actions,
    protected apiOrderService: ApiOrderService,
    protected apiProductService: ApiProductService,
    protected apiPromoCodeService: ApiPromoCodeService,
    protected orderFacadeService: OrderFacadeService,
    protected router: Router
  ) {}
}
