import { Recette } from './../model/recette.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { recetteActionTypes, recetteLoaded } from './recette.actions';

export interface RecetteState extends EntityState<Recette> {
  recetteLoaded: boolean;
}

export const adapter: EntityAdapter<Recette> = createEntityAdapter<Recette>();

export const initialState = adapter.getInitialState({
    recetteLoaded: false
});

export const RecetteReducer = createReducer(
  initialState,

  on(recetteActionTypes.recetteLoaded, (state, action) => {
    return adapter.addAll(
      action.recettes,
      {...state, recetteLoaded: true}
    );
  }),

  on(recetteActionTypes.createRecette, (state, action) => {
    return adapter.addOne(action.recette, state);
  }),

  on(recetteActionTypes.deleteRecette, (state, action) => {
    return adapter.removeOne(action.Id, state);
  }),

  on(recetteActionTypes.updateRecette, (state, action) => {
    return adapter.updateOne(action.update, state);
  })
);

export const { selectAll, selectIds } = adapter.getSelectors();