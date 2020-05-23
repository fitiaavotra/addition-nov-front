import { Recette } from './../model/recette.model';
import { createAction, props } from '@ngrx/store';
import {Update} from '@ngrx/entity';


export const loadRecette = createAction(
  '[Recette List] Load Recette via Service',
);

export const recetteLoaded = createAction(
  '[Recette Effect] Recette Loaded Successfully',
  props<{recettes: Recette[]}>()
);

export const createRecette = createAction(
  '[Create Recette Component] Create Recette',
  props<{recette: Recette}>()
);

export const deleteRecette = createAction(
  '[Recette List Operations] Delete Recette',
  props<{Id: string}>()
);

export const updateRecette = createAction(
  '[Recette List Operations] Update Recette',
  props<{update: Update<Recette>}>()
);

export const recetteActionTypes = {
    loadRecette,
    recetteLoaded,
    createRecette,
    deleteRecette,
    updateRecette
};