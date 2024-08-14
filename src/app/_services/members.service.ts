import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '../_models/member';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor(private http:HttpClient) { }
  baseUrl = environment.apiUrl;

  getMembers(){
    return this.http.get<Member[]>(this.baseUrl + 'Users/GetUsers' )
  }

  getMember(userName:string){
    return this.http.get<Member>(this.baseUrl + 'Users/GetUser/' + userName )
  }

  getHttpOptions(){
    const userString= localStorage.getItem('user');
    if(!userString) return; 

    const user = JSON.parse(userString)
    return {
      headers: new HttpHeaders({
        Authorization : 'Bearer ' + user.token
      })
    }
  }

  updateMember(member : Member){
    return this.http.put(this.baseUrl + 'Users/UpdateUser' , member);
  }
}
