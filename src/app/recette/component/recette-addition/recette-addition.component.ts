import { getAllRecette } from './../../store/recette.selectors';
import { recetteActionTypes } from './../../store/recette.actions';
import { AppState } from './../../../store/reducers/index';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Recette } from './../../model/recette.model';
import { RecetteService } from './../../service/recette.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'app-recette-list',
  templateUrl: './recette-addition.component.html'
})
export class RecetteAdditionComponent implements OnInit {

  recettes$: Observable<Recette[]>;

  recetteToBeUpdated: Recette;

  isUpdateActivated = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.recettes$ = this.store.select(getAllRecette);
  }
}