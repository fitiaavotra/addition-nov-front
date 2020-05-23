import { areRecetteLoaded } from './store/recette.selectors';
import { loadRecette, recetteLoaded } from './store/recette.actions';
import { AppState } from './../store/reducers/index';
import { Recette } from './model/recette.model';
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import {select, Store} from '@ngrx/store';
import {filter, finalize, first, tap} from 'rxjs/operators';

@Injectable()
export class RecetteResolver implements Resolve<Observable<any>> {

  constructor(private store: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store
    .pipe(
        select(areRecetteLoaded),
        tap((recetteLoaded) => {
          if (!recetteLoaded) {
            this.store.dispatch(loadRecette());
          }

        }),
        filter(recetteLoaded => recetteLoaded),
        first()
    );
  }
}