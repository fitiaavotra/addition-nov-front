import { getAllRecette,GetDetailRecette } from './../../store/recette.selectors';
import { recetteActionTypes } from './../../store/recette.actions';
import { AppState } from './../../../store/reducers/index';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Recette, Ingredients } from './../../model/recette.model';
import { RecetteService } from './../../service/recette.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm,FormArray } from '@angular/forms';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'app-recette-list',
  templateUrl: './recette-addition.component.html'
})
export class RecetteAdditionComponent implements OnInit {

  recettes$: Observable<Recette[]>;

  ingredient:Observable<Ingredients[]>;

  recetteToBeUpdated: Recette;

  myForm:FormGroup;

  isUpdateActivated = false;


  constructor(private store: Store<AppState>,private fb:FormBuilder,private service:RecetteService) { }

  ngOnInit() {
    this.recettes$ = this.store.select(getAllRecette);
    this.myForm = this.fb.group({
        boisson:this.fb.array([]),
        ingredient:this.fb.array([]),
    })
  }

  get BoissonForms(){
      return this.myForm.get('boisson') as FormArray
  }

  get IngredientForms(){
    return this.myForm.get('ingredient') as FormArray
}


  OnSelectedRecette(Id){
    console.log(Id);
    this.ingredient = this.service.GetDetail(Id);
    this.IngredientForms.clear();
    this.ingredient.subscribe(value=>value.forEach((lambda)=>{
        console.log(this.fb)

        const ingredient = this.fb.group({
            Designation:lambda.name,
            Prix:[]
        })
        this.IngredientForms.push(ingredient);
    }
    
    ))
  }

  onChange(deviceValue) {
    console.log(deviceValue);
  }

  AddBoisson(){
      const boisson = this.fb.group({
          Designation:[],
          Prix:[]
      })
      this.BoissonForms.push(boisson);
  }
  deleteBoisson(i){
    this.BoissonForms.removeAt(i);
  }
}