import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Member } from '../_models/member';
import { environment } from 'src/environments/environment.development';
import { of, tap } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor(private http:HttpClient) { }
  baseUrl = environment.apiUrl;
  // members = signal<Member[]>([]);
  paginatedResult = signal<PaginatedResult<Member[]> | null>(null) ;

  getMembers(pageNumber?:number,pageSize?:number){
    let params = new HttpParams();

    if(pageNumber && pageSize){
      params = params.append('pageNumber',pageNumber)
      params = params.append('pageSize',pageSize)
    }

    return this.http.get<Member[]>(this.baseUrl + 'Users/GetUsers',{observe:'response',params} ).subscribe({
      next: response =>{
        this.paginatedResult.set({
          items:response.body as Member[],
          pagination:JSON.parse(response.headers.get('Pagination')!)
        })
      } 
    })
  }

  getMember(userName:string){
    // const member = this.members().find(member => member.userName === userName);
    // if(member !== undefined ) return of(member);

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
      // tap(()=>{
      //   this.members.update(members => members.map(m=>m.userName === member.userName ? member : m))
      // })
    )
  }

  setMainPhoto(photoId:number){
   return this.http.put(this.baseUrl + 'Users/SetMain/' +photoId,{});
  }

  deletePhoto(photoId:number){
   return this.http.delete(this.baseUrl + 'Users/DeletePhoto/' + photoId  );
  }
}
