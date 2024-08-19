import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/users'; 
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
 baseUrl =  environment.apiUrl; 
 currentUser = signal<User | null>(null);

  constructor(private http:HttpClient) { }

  login(model:any){
    return this.http.post<User>(this.baseUrl + 'Account/Login' , model).pipe(
      map((response:User) =>{
        const user = response;
        if(user){
          this.setCurrentUser(user)
        }
        return response;
      })
    )
  }

  register(modal:any){
    return this.http.post<User>(this.baseUrl + 'Account/Register',modal).pipe(
      map(user=>{
        if(user){
          this.setCurrentUser(user)
        }
        return user;
      })
    )
  }


  logout(){
    this.currentUser.set(null);
    localStorage.removeItem('user');
  }

  setCurrentUser(user: User){
    this.currentUser.set(user);
    localStorage.setItem('user',JSON.stringify(user));
  }

}


