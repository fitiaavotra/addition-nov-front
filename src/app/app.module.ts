import { BrowserModule } from '@angular/platform-browser';


import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';


import { environment } from '../environments/environment';

import {RecetteModule} from './recette/recette.module'
import {CreateRecetteComponent} from './recette/component/create-recette/create-recette.component'
import {RecetteListComponent} from './recette/component/recette-list/recette-list.component'
import { AppRoutingModule } from './app-routing.module';
import {RecetteResolver} from './recette/recette.resolver'
import { AppComponent } from './app.component';





const routes = [
  {
    path: 'recettes',
    component: RecetteListComponent,
    resolve: {
      recette: RecetteResolver
    }
  },
  {path: 'create-recette', component: CreateRecetteComponent},
  {path: '**', redirectTo: 'recette'}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RecetteModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    EffectsModule.forRoot([]),
    StoreModule.forRoot(reducers, {
      metaReducers, 
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [RecetteResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
