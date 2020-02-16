import { Pipe, PipeTransform } from '@angular/core';

import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';

@Pipe({
  name: 'productUrl'
})
export class ProductUrlPipe implements PipeTransform {
  public transform(product: Product, activeCategory: Category = null): string {
    const activeCategorySuffix: string = activeCategory ? ',' + activeCategory.id + '' : '';

    return `/p/${product.id}/${product.slug}${activeCategorySuffix}`;
  }
}
