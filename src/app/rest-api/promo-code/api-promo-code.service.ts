import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { API_URL_PROMO_CODE } from '../endpoints';
import { PromoCodeStore } from '../../models/promo-code.model';

import { PromoCodeResponseDto } from './api-promo-code.dtos';
import { fromPromoCodeResponseDto } from './api-promo-code.mappers';

@Injectable({
  providedIn: 'root'
})
export class ApiPromoCodeService {
  public constructor(protected http: HttpClient) {}

  public getPromoCode(promoCodeTextField: string): Observable<PromoCodeStore> {
    return this.http
      .get<PromoCodeResponseDto>(API_URL_PROMO_CODE(promoCodeTextField))
      .pipe(
        map(
          (promoCodeResponseDto: PromoCodeResponseDto): PromoCodeStore => fromPromoCodeResponseDto(promoCodeResponseDto)
        )
      );
  }
}
