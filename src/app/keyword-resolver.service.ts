import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
}                                 from '@angular/router';
import { Observable, of, EMPTY }  from 'rxjs';
import { mergeMap, take }         from 'rxjs/operators';

import { Keyword } from './model'; 
import { StoreService } from './store.service'; 

@Injectable({
  providedIn: 'root'
})
export class KeywordResolverService {

  constructor(
    private router: Router, 
    private store: StoreService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Keyword> | Observable<never> {
    let keyword = route.paramMap.get('keyword');

    return this.store.isKeyword(keyword).pipe(
      take(1), 
      mergeMap(keyword => {
        if (keyword) {
          return of(keyword);
        } else { // id not found
          this.router.navigate(['/research']);
          return EMPTY;
        }
      })
    )

    // return this.cs.getCrisis(id).pipe(
    //   take(1),
    //   mergeMap(crisis => {
    //     if (crisis) {
    //       return of(crisis);
    //     } else { // id not found
    //       this.router.navigate(['/crisis-center']);
    //       return EMPTY;
    //     }
    //   })
    // );
  }
}
