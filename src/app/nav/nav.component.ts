import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable, of } from 'rxjs';
import { User } from '../_models/users';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  // variables
 model:any = {
  UserName:'',
  password:'',
  };
  currentUser$ : Observable<User | null> = of(null);

  constructor(
    public accountService:AccountService,
    private router:Router,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
  }
 
  

 login(){
  this.accountService.login(this.model).subscribe({
    next:res=>{
      this.router.navigateByUrl('/members');
    }, 
  })
 }

 logout() {
  this.accountService.logout(); 
  this.router.navigateByUrl('/');
 }

}
