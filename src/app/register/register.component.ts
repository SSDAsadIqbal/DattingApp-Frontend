import { Component, EventEmitter, Input, NgModule, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter<boolean>();
  model: any = {};


  constructor(
    private accountService:AccountService,
    private toastr:ToastrService
  ) { }

  
  
  ngOnInit() {
  }
  

  

  register(){
    this.accountService.register(this.model).subscribe({
      next:res=>{ 
        this.cancel();
      },
       error: error=> this.toastr.error(error.error)
    })
  }
  
  cancel(){
    this.cancelRegister.emit(false);
  }
}
