import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/users';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
 baseUrl = 'http://192.168.1.115:5000/api/v1/';
 private currentUserSource = new BehaviorSubject<User | null>(null);
 currentUser$ = this.currentUserSource.asObservable();

  constructor(private http:HttpClient) { }

  login(model:any){
    return this.http.post<User>(this.baseUrl + 'Account/Login' , model).pipe(
      map((response:User) =>{
        const user = response;
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }

  register(modal:any){
    return this.http.post<User>(this.baseUrl + 'Account/Register',modal).pipe(
      map(user=>{
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return user;
      })
    )
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  setCurrentUser(user: User){
    this.currentUserSource.next(user);
  }

}


