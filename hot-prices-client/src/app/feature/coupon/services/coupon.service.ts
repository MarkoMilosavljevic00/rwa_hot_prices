import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Coupon } from '../models/coupon.model';
import { FormCouponDto } from '../models/dtos/form-coupon.dto';
import { FilterCouponDto } from '../models/dtos/filter-coupon.dto';
import { PostType } from 'src/app/common/enums/post-type.enum';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  constructor(private readonly http: HttpClient) {}

  createCoupon(formCouponDto: FormCouponDto) {
    return this.http.post<Coupon>(`${environment.api}/post`, formCouponDto);
  }

  updateCoupon(id: number, formCouponDto: FormCouponDto) {
    return this.http.patch<Coupon>(
      `${environment.api}/post/${id}`,
      formCouponDto
    );
  }

  deleteCoupon(id: number) {
    return this.http.delete<Coupon>(`${environment.api}/post/${id}`);
  }

  getCouponById(id: number) {
    return this.http.get<Coupon>(
      `${environment.api}/post/${PostType.COUPON}/${id}`
    );
  }

  getCouponByIdAdmin(id: number) {
    return this.http.get<Coupon>(
      `${environment.api}/post/admin/${PostType.COUPON}/${id}`
    );
  }

  getCouponsByFilter(filterCouponDto: FilterCouponDto) {
    let params = new HttpParams();

    Object.keys(filterCouponDto).forEach((key: string) => {
      const value = filterCouponDto[key as keyof FilterCouponDto];
      if (value != undefined) {
        params = params.set(key, value.toString());
      }
    });

    params = params.set('postType', PostType.COUPON);

    return this.http.get<{ posts: Coupon[]; length: number }>(
      `${environment.api}/post/get-posts-by-filter`,
      { params }
    );
  }

  getCouponsByFilterAdmin(filterCouponDto: FilterCouponDto) {
    let params = new HttpParams();

    Object.keys(filterCouponDto).forEach((key: string) => {
      const value = filterCouponDto[key as keyof FilterCouponDto];
      if (value != undefined) {
        params = params.set(key, value.toString());
      }
    });

    params = params.set('postType', PostType.COUPON);

    return this.http.get<{ posts: Coupon[]; length: number }>(
      `${environment.api}/post/admin/get-posts-by-filter`,
      { params }
    );
  }

  getCouponsDistinctProperty(key: string) {
    let params = new HttpParams().set('postType', PostType.COUPON);

    return this.http.get<string[]>(
      `${environment.api}/post/distinct-property-filter/${key}`,
      { params }
    );
  }

  getCouponsDistinctPropertyByFilter(
    key: string,
    filterCouponDto: FilterCouponDto
  ) {
    let params = new HttpParams();

    Object.keys(filterCouponDto).forEach((key: string) => {
      const value = filterCouponDto[key as keyof FilterCouponDto];
      if (value != undefined) {
        params = params.set(key, value.toString());
      }
    });

    params = params.set('postType', PostType.COUPON);

    return this.http.get<string[]>(
      `${environment.api}/post/distinct-property-filter/${key}`,
      { params }
    );
  }

  restrictCoupon(id: number) {
    return this.http.patch<Coupon>(`${environment.api}/post/restrict/${id}`, {});
  }
}
