import { createSelector } from '@ngrx/store';

import { State } from '../reducers';
import * as fromProductReducers from '../reducers/product.reducers';
import { Product } from '../../models/product.model';
import { selectActiveCategoryAndItsChildren, selectCategoryAndItsChildren } from './category.selectors';
import { Category } from '../../models/category.model';

export const selectProductFeature = (state: State): fromProductReducers.State => state.product;

export const selectProductsAsArray = createSelector(
  selectProductFeature,
  (productFeature: fromProductReducers.State): Product[] =>
    Object.keys(productFeature.list).map((key: string): Product => productFeature.list[key])
);

const getProductsForGivenCategories = (productsAsArray: Product[], categories: Category[]): Product[] => {
  return categories.length
    ? productsAsArray.filter((product: Product): boolean => {
        let match = false;

        for (let i = 0; i < categories.length; i++) {
          match = product.categoryIds.includes(categories[i].id);
          if (match) {
            break;
          }
        }

        return match;
      })
    : [];
};

export const selectProductsFromActiveCategoryAndItsChildren = createSelector(
  selectProductsAsArray,
  selectActiveCategoryAndItsChildren,
  (productsAsArray: Product[], activeCategoryAndItsChildren: Category[]): Product[] =>
    getProductsForGivenCategories(productsAsArray, activeCategoryAndItsChildren)
);

export const selectProductsCountFromCategoryAndItsChildrenByCategoryId = createSelector(
  selectProductsAsArray,
  selectCategoryAndItsChildren,
  (productsAsArray: Product[], activeCategoryAndItsChildren: Category[], props: { id: number }): number =>
    getProductsForGivenCategories(productsAsArray, activeCategoryAndItsChildren).length
);
