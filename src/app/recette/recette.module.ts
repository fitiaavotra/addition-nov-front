import { RecetteEffects } from './store/recette.effects';
import { RecetteService } from './service/recette.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RecetteReducer } from './store/recette.reducers';

import {CreateRecetteComponent} from './component/create-recette/create-recette.component'
import {RecetteListComponent} from './component/recette-list/recette-list.component'
import {RecetteAdditionComponent} from './component/recette-addition/recette-addition.component'




@NgModule({
  declarations: [

    CreateRecetteComponent,
    RecetteListComponent,
    RecetteAdditionComponent

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature('recettes',RecetteReducer),
    EffectsModule.forFeature([RecetteEffects]),
    FormsModule,
  ],
  providers:[RecetteService],
  bootstrap:[],
  exports: [CreateRecetteComponent,RecetteListComponent,RecetteAdditionComponent]
})
export class RecetteModule { }
