import { Component, OnInit } from '@angular/core';

import { ClickableActionTheme } from '../clickable-action/clickable-action.model';
import { CategoryService } from '../../services/category.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'rr-shop-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  public isCollapseExpandButtonVisible$: Observable<boolean>;
  public isListCollapsed$: Observable<boolean>;

  public readonly ClickableActionTheme = ClickableActionTheme;

  public constructor(protected categoryService: CategoryService) {
    this.isCollapseExpandButtonVisible$ = categoryService.isCollapseExpandButtonVisible$;
    this.isListCollapsed$ = categoryService.isListCollapsed$;
  }

  public ngOnInit(): void {}

  public onCollapseClick(): void {
    this.categoryService.collapse();
  }

  public onExpandClick(): void {
    this.categoryService.expand();
  }
}
