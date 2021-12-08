import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthToken } from '../models/AuthToken';
import {User} from '../models/User'

const apiUrl = 'http://localhost:2508/login'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient) { }

  authenticate(login:String, password:String): Observable<any>{
    return this.http.post(apiUrl, {login, password}, httpOptions)
  }
}
