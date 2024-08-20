import { Component, EventEmitter, Input, NgModule, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { JsonPipe, NgIf } from '@angular/common';
import { TextInputComponent } from "../_forms/text-input/text-input.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, NgIf, TextInputComponent]
})


export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter<boolean>();
  model: any = {};
  registerForm: FormGroup = new FormGroup({});

  constructor(
    private accountService:AccountService,
    private toastr:ToastrService
  ) { } 
  
  ngOnInit() {
    this.registerForm= new FormGroup({
      username: new FormControl('', Validators.required),
      password:new FormControl('', [Validators.required,Validators.minLength(4),Validators.maxLength(10)]),
      confirmPassword:new FormControl('', [Validators.required,this.matchValues('password')]),
    })
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: ()=> this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }  

  matchValues(matchTo: string):ValidatorFn{
    return (control:AbstractControl) =>{
      return control.value === control.parent?.get(matchTo)?.value ? null :{isMatching: true}
    }
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
