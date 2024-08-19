import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Member } from '../_models/member';
import { environment } from 'src/environments/environment.development';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor(private http:HttpClient) { }
  baseUrl = environment.apiUrl;
  members = signal<Member[]>([]);

  getMembers(){
    return this.http.get<Member[]>(this.baseUrl + 'Users/GetUsers' ).subscribe({
      next: memebrs => this.members.set(memebrs)
    })
  }

  getMember(userName:string){
    const member = this.members().find(member => member.userName === userName);
    if(member !== undefined ) return of(member);

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
    return this.http.put(this.baseUrl + 'Users/UpdateUser' , member).pipe(
      tap(()=>{
        this.members.update(members => members.map(m=>m.userName === member.userName ? member : m))
      })
    )
  }

  setMainPhoto(photoId:number){
   return this.http.put(this.baseUrl + 'Users/SetMain/' +photoId,{});
  }

  deletePhoto(photoId:number){
   return this.http.delete(this.baseUrl + 'Users/DeletePhoto/' + photoId  );
  }
}
