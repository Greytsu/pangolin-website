import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/User';
import { TokenStorageService } from './token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const apiUrl = 'http://localhost:2508/users/'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  getById(id:String): Observable<any>{
    return this.http.get(apiUrl+"id/"+id, httpOptions)
  }

  getByUsername(username:String): Observable<any>{
    return this.http.get(apiUrl+'username/'+username, httpOptions)
  }

  updateFriends(userId:String, newFriends:String[]): Observable<any>{
    return this.http.patch(apiUrl + userId, {friends:newFriends}, httpOptions)
  }

  updateRole(user:User): Observable<any>{
    return this.http.patch(apiUrl + user._id, {role:user.role}, httpOptions)
  }

  saveUser(user:User):Observable<any>{
    console.log("user");
    return this.http.post(apiUrl, user, httpOptions)
  }

}
