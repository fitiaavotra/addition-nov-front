import {Recette } from './../../model/recette.model';
import { createRecette } from './../../store/recette.actions';
import { AppState } from './../../../store/reducers/index';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as uuid from 'uuid';

@Component({
  selector: 'app-create-recette',
  templateUrl: './create-recette.component.html'
})
export class CreateRecetteComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  onSubmit(submittedForm) {
    console.log(submittedForm.value);

    if (submittedForm.invalid) {
      return;
    }


    const recette: Recette = {id: uuid.v4(), name: submittedForm.value.name, description: submittedForm.value.description};
    this.store.dispatch(createRecette({recette}));

  }
}