import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {
  EMPTY,
  catchError,
  concatMap,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
} from 'rxjs';
import * as CouponActions from './coupon.action';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { KEYS, PAGE } from 'src/app/common/constants';
import { CommentService } from '../../comment/services/comment.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { NotificationSeverity, NotificationSummary } from 'src/app/common/enums/message.enum';
import { CouponService } from '../services/coupon.service';
import { FilterCouponDto } from '../models/dtos/filter-coupon.dto';

@Injectable()
export class CouponEffects {
  createCoupon$ = createEffect(() =>
    this.action$.pipe(
      ofType(CouponActions.createCoupon),
      switchMap(({ formCouponDto }) =>
        this.couponService.createCoupon(formCouponDto).pipe(
          concatMap((coupon) => {
            return [
              CouponActions.createCouponSuccess({
                coupon,
              }),
            ];
          }),
          catchError(({ error }) =>
            of(CouponActions.createCouponFailure(error))
          )
        )
      )
    )
  );

  updateCoupon$ = createEffect(() =>
    this.action$.pipe(
      ofType(CouponActions.updateCoupon),
      switchMap(({ id, formCouponDto }) =>
        this.couponService
          .updateCoupon(id, formCouponDto)
          .pipe(
            concatMap((coupon) => {
              return [
                CouponActions.updateCouponSuccess({ coupon }),
              ];
            }),
            catchError((error) =>
              of(CouponActions.updateCouponFailure({ error }))
            )
          )
      )
    )
  );

  submittedCouponSuccess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(
          CouponActions.createCouponSuccess,
          CouponActions.updateCouponSuccess
        ),
        tap(({ coupon }) => {
          this.router.navigate([
            '/posts/details/coupon/' + coupon.id,
          ]);
          this.notificationService.showMessage(
            NotificationSeverity.SUCCESS,
            NotificationSummary.SUCCESS,
            'Coupon saved successfully'
          );
        })
      ),
    { dispatch: false }
  );

  submittedCouponFailure$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(
          CouponActions.createCouponFailure,
          CouponActions.updateCouponFailure,
          CouponActions.deleteCouponFailure
        ),
        tap(({ error }) => {
          this.notificationService.showMessage(
            NotificationSeverity.ERROR,
            NotificationSummary.ERROR,
            error.error.message
          );
        })
      ),
    { dispatch: false }
  );

  deleteCoupon$ = createEffect(() =>
    this.action$.pipe(
      ofType(CouponActions.deleteCoupon),
      switchMap(({ id }) =>
        this.couponService.deleteCoupon(id).pipe(
          map(() => CouponActions.deleteCouponSuccess()),
          catchError((error) =>
            of(CouponActions.deleteCouponFailure({ error }))
          )
        )
      )
    )
  );

  deleteCouponSuccess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(CouponActions.deleteCouponSuccess),
        tap(() => {
          this.router.navigate(['/posts/coupons']);
          this.notificationService.showMessage(
            NotificationSeverity.SUCCESS,
            NotificationSummary.SUCCESS,
            'Coupon deleted successfully'
          );
        })
      ),
    { dispatch: false }
  );

  loadCoupon$ = createEffect(() =>
    this.action$.pipe(
      ofType(CouponActions.loadCoupons),
      switchMap(({ filterCouponDto }) => {
        // const filterCouponDto: FilterCouponDto = filterCoupon;
        return this.couponService
          .getCouponsByFilter(filterCouponDto)
          .pipe(
            // tap(({ posts }) => console.log(posts)),
            tap(({ posts }) => console.log('COUPONS Loading...')),
            map(({ posts, length }) => {
              // console.log(posts);
              return CouponActions.loadCouponsSuccess({
                coupons: posts,
                length,
              });
            }),
            catchError((error) =>
              of(CouponActions.loadCouponsFailure({ error }))
            )
          );
      })
    )
  );

  loadDetailedCoupon$ = createEffect(() =>
    this.action$.pipe(
      ofType(CouponActions.loadDetailedCoupon),
      switchMap(({ id }) =>
        this.couponService.getCouponById(id).pipe(
          map(
            (coupon) =>
              CouponActions.loadDetailedCouponSuccess({
                coupon,
              }),
          ),
          catchError((error) =>
          of(CouponActions.loadDetailedCouponFailure({ error }))
        )
        )
      )
    )
  );

  loadEditingCoupon$ = createEffect(() =>
    this.action$.pipe(
      ofType(CouponActions.loadEditingCoupon),
      switchMap(({ id }) =>
        this.couponService.getCouponById(id).pipe(
          map((coupon) =>
            CouponActions.loadEditingCouponSuccess({ coupon })
          ),
          catchError((error) =>
            of(CouponActions.loadEditingCouponFailure({ error }))
          )
        )
      )
    )
  );

  loadCouponFailure$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(
          CouponActions.loadDetailedCouponFailure,
          CouponActions.loadEditingCouponFailure
        ),
        tap(({ error }) => {
          this.router.navigate(['/posts/coupons']);
          this.notificationService.showMessage(
            NotificationSeverity.ERROR,
            'Error',
            error.error.message
          );
        })
      ),
    { dispatch: false }
  );

  // changeCouponFilter$ = createEffect(() =>
  //   this.action$.pipe(
  //     ofType(CouponActions.changeCouponFilter),
  //     switchMap(({ filterCoupon }) => {
  //       const { selectedCategory, selectedUser, isDiscountEnabled, isPricingEnabled, ...filterCouponDto } =
  //         filterCoupon;
  //       return this.couponService
  //         .getCouponsByFilter(filterCouponDto)
  //         .pipe(
  //           // tap((posts) => console.log('change coupon filter',  posts)),
  //           map(({ posts, length }) =>
  //             CouponActions.loadCouponsSuccess({
  //               coupons: posts,
  //               length,
  //             })
  //           ),
  //           catchError((error) =>
  //             of(CouponActions.loadCouponsFailure({ error }))
  //           )
  //         );
  //     })
  //   )
  // );

  loadAvailableTitles$ = createEffect(() =>
    this.action$.pipe(
      ofType(
        CouponActions.changeCouponFilter,
        CouponActions.loadCouponTitles
      ),
      switchMap(({ filterCoupon: filter }) => {
        const { selectedCategory, selectedUser, ...filterOfferDto } = filter;
        return this.couponService
          .getCouponsDistinctPropertyByFilter(KEYS.TITLE, filterOfferDto)
          .pipe(
            map((titles) =>
              CouponActions.loadCouponTitlesSuccess({ titles })
            ),
            catchError(() => of())
          );
      })
    )
  );

  // // loadAllCommentsFromOffer$ = createEffect(() =>
  // //   this.action$.pipe(
  // //     ofType(OfferActions.loadAllCommentsFromOffer),
  // //     switchMap(({ offerId }) => {
  // //       return this.commentService.getAllCommentsByPostId(offerId).pipe(
  // //         map((comments) =>
  // //           OfferActions.loadAllCommentsFromOfferSuccess({ comments })
  // //         ),
  // //         catchError(() => of())
  // //       );
  // //     })
  // //   )
  // // );

  constructor(
    private action$: Actions,
    private couponService: CouponService,
    private notificationService: NotificationService,
    private commentService: CommentService,
    private router: Router
  ) {}
}
