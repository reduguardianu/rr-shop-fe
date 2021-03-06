import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CategoryUrlPipe } from './category-url/category-url.pipe';
import { DateCustomPipe } from './date/date-custom.pipe';
import { ExternalIdPipe } from './external-id/external-id.pipe';
import { ImagePipe } from './image/image.pipe';
import { OrderStatusPipe } from './order-status/order-status.pipe';
import { PricePipe } from './price/price.pipe';
import { ProductUrlPipe } from './product-url/product-url.pipe';
import { QuantityTextPipe } from './quantity-text/quantity-text.pipe';
import { SafeHtmlPipe } from './safeHtml/safe-html.pipe';

const pipes = [
  CategoryUrlPipe,
  DateCustomPipe,
  ExternalIdPipe,
  ImagePipe,
  OrderStatusPipe,
  PricePipe,
  ProductUrlPipe,
  QuantityTextPipe,
  SafeHtmlPipe
];

@NgModule({
  declarations: [...pipes],
  exports: [...pipes],
  imports: [CommonModule]
})
export class PipesModule {}
