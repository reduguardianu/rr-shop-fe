import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { OrderService } from '../../../services/order.service';
import { Size } from '../../../models/image.model';
import { OrderFacadeService } from '../../../store/facades/order-facade.service';
import { OrderItem } from '../../../models/order-item.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[rr-shop-order-item-overview]',
  templateUrl: './order-item-overview.component.html',
  styleUrls: ['./order-item-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderItemOverviewComponent implements OnInit {
  @Input()
  public orderItem: OrderItem;

  public readonly Size = Size;

  public constructor(protected orderFacadeService: OrderFacadeService, protected orderService: OrderService) {}

  public ngOnInit(): void {}

  public quantityDecrement(id: number): void {
    this.orderFacadeService.quantityDecrement(id);
  }

  public quantityIncrement(id: number): void {
    this.orderFacadeService.quantityIncrement(id);
  }

  public remove(id: number): void {
    this.orderService.remove(id);
  }
}