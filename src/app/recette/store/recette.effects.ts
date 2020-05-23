import { recetteActionTypes, recetteLoaded, updateRecette } from './recette.actions';
import { RecetteService } from './../service/recette.service';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { concatMap, map, tap  } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class RecetteEffects {
    
    constructor(private recetteService: RecetteService, private actions$: Actions, private router: Router) {}

    loadRecette$ = createEffect(() =>
    this.actions$.pipe(
        ofType(recetteActionTypes.loadRecette),
        concatMap(() => this.recetteService.GetAll()),
        map(recettes => recetteActionTypes.recetteLoaded({recettes}))
    )
    );

    createRecette$ = createEffect(() =>
    this.actions$.pipe(
        ofType(recetteActionTypes.createRecette),
        concatMap((action) => this.recetteService.CreateRecette(action.recette)),
        tap(() => this.router.navigateByUrl('/recettes'))
    ),
    {dispatch: false}
    );

    deleteRecette$ = createEffect(() =>
        this.actions$.pipe(
        ofType(recetteActionTypes.deleteRecette),
        concatMap((action) => this.recetteService.deleteRecette(action.Id))
        ),
        {dispatch: false}
    );
    updateRecette$ = createEffect(() =>
        this.actions$.pipe(
        ofType(recetteActionTypes.updateRecette),
        concatMap((action) => this.recetteService.updateRecette(action.update.id, action.update.changes))
        ),
        {dispatch: false}
    );
}
