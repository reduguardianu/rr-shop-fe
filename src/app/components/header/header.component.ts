import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Align } from '../top-menu/top-menu.models';

@Component({
  selector: 'rr-shop-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  public readonly Align = Align;

  public constructor() {}

  public ngOnInit(): void {}
}
