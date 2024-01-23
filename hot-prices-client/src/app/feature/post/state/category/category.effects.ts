import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap, of, switchMap, tap } from 'rxjs';
import * as CategoryActions from './category.action';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CategoryService } from '../../services/category.service';

@Injectable()
export class CategoryEffects {
  loadOffers$ = createEffect(() =>
    this.action$.pipe(
      ofType(CategoryActions.loadCategories),
      mergeMap(() =>
        this.categoryService.getAll().pipe(
          map((categories) => {
            return CategoryActions.loadCategoriesSuccess({
              categories,
            });
          }),
          catchError(() => of({ type: 'load error' }))
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private categoryService: CategoryService,
    private messageService: MessageService,
    private router: Router
  ) {}
}
