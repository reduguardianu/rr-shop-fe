import { createSelector } from '@ngrx/store';

import { ApiCall } from '../../models/page.model';
import {
  selectApiCallProduct,
  selectApiCallProductsAtCategory,
  selectApiCallProductsAtInit
} from './product-core.selectors';
import { selectApiCallCategoriesAtInit } from './category-core.selectors';
import {
  selectApiCallCreateOrder,
  selectApiCallOrder,
  selectApiCallPotentialOrderProducts,
  selectApiCallPromoCode
} from './order-core.selectors';

export const selectIsLoadingOverlayVisible = createSelector(
  selectApiCallCategoriesAtInit,
  selectApiCallCreateOrder,
  selectApiCallOrder,
  selectApiCallPotentialOrderProducts,
  selectApiCallProduct,
  selectApiCallProductsAtCategory,
  selectApiCallProductsAtInit,
  selectApiCallPromoCode,
  (
    apiCallCategoriesAtInit: ApiCall,
    apiCallCreateOrder: ApiCall,
    apiCallOrder: ApiCall,
    apiCallPotentialOrderProducts: ApiCall,
    apiCallProduct: ApiCall,
    apiCallProductsAtCategory: ApiCall,
    apiCallProductsAtInit: ApiCall,
    apiCallPromoCode: ApiCall
  ): boolean =>
    [ApiCall.Initial, ApiCall.Request].includes(apiCallCategoriesAtInit) ||
    [ApiCall.Request].includes(apiCallCreateOrder) ||
    [ApiCall.Request].includes(apiCallOrder) ||
    [ApiCall.Request].includes(apiCallPotentialOrderProducts) ||
    [ApiCall.Request].includes(apiCallProduct) ||
    [ApiCall.Request].includes(apiCallProductsAtCategory) ||
    [ApiCall.Request].includes(apiCallPromoCode) ||
    [ApiCall.Initial, ApiCall.Request].includes(apiCallProductsAtInit)
);
