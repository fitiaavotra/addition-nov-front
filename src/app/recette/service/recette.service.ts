import {Recette} from './../model/recette.model';
import {Injectable} from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RecetteService {

    http:HttpClient;

    constructor(http:HttpClient){
        this.http = http;
    }

    GetAll(): Observable<Recette[]> {
        return this.http.get<Recette[]>('/api/recettes');
    }

    CreateRecette(recette:Recette):Observable<Recette>{
        return this.http.post<Recette>('/api/recettes/', recette);
    }

    deleteRecette(Id: string): Observable<any> {
        return this.http.delete('/api/recettes/' + Id);
    }
    
    updateRecette(Id: string | number, changes: Partial<Recette>): Observable<any> {
        return this.http.put('/api/recettes/' + Id, changes);
    }
}