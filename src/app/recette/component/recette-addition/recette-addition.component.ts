import { getAllRecette } from './../../store/recette.selectors';
import { recetteActionTypes } from './../../store/recette.actions';
import { AppState } from './../../../store/reducers/index';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Recette, Ingredients } from './../../model/recette.model';
import { RecetteService } from './../../service/recette.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm,FormArray } from '@angular/forms';
import { Update } from '@ngrx/entity';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

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
        sumBoisson:[{ value: '', disabled: true }],
        sumCommande:[{ value: '', disabled: true }]
    })


    this.BoissonForms.valueChanges.subscribe(value => {
        console.log(value);
        let sum : number = value.map(a=>a.Prix).reduce(function (a,b) {return a+b})
        if(sum>=100000){
            sum = sum - ((sum*20)/100);
        }
        this.myForm.get('sumBoisson').setValue(sum);
       });

    this.IngredientForms.valueChanges.subscribe(value=>{
        let sum : number = value.map(a=>a.Prix).reduce(function (a,b) {return a+b})
        this.myForm.get('sumCommande').setValue((this.myForm.get('sumBoisson').value+sum))
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
        //console.log(this.fb)

        const ingredient = this.fb.group({
            Designation:[{ value: lambda.name, disabled: true }],
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