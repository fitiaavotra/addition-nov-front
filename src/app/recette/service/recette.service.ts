import {Recette,Ingredients} from './../model/recette.model';
import {Injectable} from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {environment} from './../../../environments/environment'

@Injectable()
export class RecetteService {

    http:HttpClient;
    EndPointUrl:string;

    constructor(http:HttpClient){
        this.http = http;
        this.EndPointUrl = environment.EndPoint;
    }

    GetAll(): Observable<Recette[]> {
        return this.http.get<Recette[]>(this.EndPointUrl+'/api/Recette');
    }

    CreateRecette(recette:Recette):Observable<Recette>{
        return this.http.post<Recette>(this.EndPointUrl+'/api/Recette/', recette);
    }

    deleteRecette(Id: string): Observable<any> {
        return this.http.delete(this.EndPointUrl+'/api/Recette/' + Id);
    }
    
    updateRecette(Id: string | number, changes: Partial<Recette>): Observable<any> {
        return this.http.put(this.EndPointUrl+'/api/Recette/' + Id, changes);
    }

    GetDetail(Id:string): Observable<Ingredients[]>  {
        return this.http.get<Ingredients[]>(this.EndPointUrl+'/api/Recette/GetDetail');
    }
}