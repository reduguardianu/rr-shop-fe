import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'rr-shop-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent implements OnInit {
  public constructor() {}

  public ngOnInit(): void {}
}
