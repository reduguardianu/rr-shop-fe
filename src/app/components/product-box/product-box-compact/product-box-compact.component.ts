import { Component, OnInit } from '@angular/core';

import { ProductBoxAbstractComponent } from '../product-box-abstract.component';

@Component({
  selector: 'rr-shop-product-box-compact',
  templateUrl: './product-box-compact.component.html',
  styleUrls: ['./product-box-compact.component.scss']
})
export class ProductBoxCompactComponent extends ProductBoxAbstractComponent implements OnInit {
  public ngOnInit(): void {
    // console.log('ProductBoxCompactComponent nginit', this.product.name);
  }
}
