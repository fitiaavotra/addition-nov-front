import { RecetteState } from './recette.reducers';
import { Recette } from './../model/recette.model';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { selectAll, selectIds } from './recette.reducers';

export const recetteFeatureSelector = createFeatureSelector<RecetteState>('recettes');

export const getAllRecette = createSelector(
 recetteFeatureSelector,
  selectAll
);

export const areRecetteLoaded = createSelector(
  recetteFeatureSelector,
  state => state.recetteLoaded
);