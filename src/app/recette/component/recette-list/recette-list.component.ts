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
  templateUrl: './recette-list.component.html'
})
export class RecetteListComponent implements OnInit {

  recettes$: Observable<Recette[]>;

  recetteToBeUpdated: Recette;

  isUpdateActivated = false;

  constructor(private recetteService: RecetteService, private store: Store<AppState>) { }

  ngOnInit() {
    this.recettes$ = this.store.select(getAllRecette);
  }

  deleteRecette(Id: string) {
    this.store.dispatch(recetteActionTypes.deleteRecette({Id}));
  }

  showUpdateForm(recette: Recette) {
    this.recetteToBeUpdated = {...recette};
    this.isUpdateActivated = true;
  }

  updateRecette(updateForm) {
    const update: Update<Recette> = {
      id: this.recetteToBeUpdated.id,
      changes: {
        ...this.recetteToBeUpdated,
        ...updateForm.value
      }
    };

    this.store.dispatch(recetteActionTypes.updateRecette({update}));
    this.isUpdateActivated = false;
    this.recetteToBeUpdated = null;
  }
}