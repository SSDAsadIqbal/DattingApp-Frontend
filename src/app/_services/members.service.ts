import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Member } from '../_models/member';
import { environment } from 'src/environments/environment.development';
import { of, tap } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { UserParams } from '../_models/userParams';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor(private http:HttpClient) { }
  baseUrl = environment.apiUrl;
  // members = signal<Member[]>([]);
  paginatedResult = signal<PaginatedResult<Member[]> | null>(null) ;
  memeberCache = new Map();
  accountService = inject(AccountService)
  user = this.accountService.currentUser();
  userparams = signal<UserParams>(new UserParams(this.user))

  resetUserParams(){
    this.userparams.set(new UserParams(this.user))
  }

  getMembers(){  
    debugger
    const response = this.memeberCache.get(Object.values(this.userparams()).join('-'));
    if(response) return this.setPaginatedReponse(response);

    let params = this.setPaginationHeader(this.userparams().pageNumber, this.userparams().pageSize);

    params = params.append('minAge', this.userparams().minAge);
    params = params.append('maxAge', this.userparams().maxAge);
    params = params.append('gender', this.userparams().gender);
    params = params.append('orderBy', this.userparams().orderBy);

    return this.http.get<Member[]>(this.baseUrl + 'Users/GetUsers',{observe:'response',params} ).subscribe({
      next: response =>{
        this.setPaginatedReponse(response);
        this.memeberCache.set(Object.values(this.userparams()).join('-'),response);
      } 
    })
  }

  private setPaginatedReponse(response:HttpResponse<Member[]>){
    this.paginatedResult.set({
      items:response.body as Member[],
      pagination:JSON.parse(response.headers.get('Pagination')!)
    })
  }

  setPaginationHeader(pageNumber?:number,pageSize?:number){
    let params =new HttpParams();

    if(pageNumber && pageSize){
      params = params.append('pageNumber',pageNumber)
      params = params.append('pageSize',pageSize)
    }

    return params;
  }

  getMember(userName:string){
    const member:Member = [...this.memeberCache.values()]
      .reduce((previousValues, currentValueItem) => previousValues.concat(currentValueItem.body), [])
      .find((m:Member)=>m.userName === userName);
    if(member) return of(member);

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
