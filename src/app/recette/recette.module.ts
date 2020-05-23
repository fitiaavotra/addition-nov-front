import { RecetteEffects } from './store/recette.effects';
import { RecetteService } from './service/recette.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RecetteReducer } from './store/recette.reducers';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forFeature('recettes',RecetteReducer),
    EffectsModule.forFeature([RecetteEffects])
  ],
  providers:[RecetteService],
  bootstrap:[]
})
export class RecetteModule { }
