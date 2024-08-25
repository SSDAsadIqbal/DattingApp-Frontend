import { Component, EventEmitter, inject, Input, NgModule, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { JsonPipe, NgIf } from '@angular/common';
import { TextInputComponent } from "../_forms/text-input/text-input.component";
import { DatePickerComponent } from "../_forms/date-picker/date-picker.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, NgIf, TextInputComponent, DatePickerComponent]
})


export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter<boolean>();
  private fb  = inject(FormBuilder) 
  model: any = {};
  maxDate= new Date();
  registerForm: FormGroup = new FormGroup({});
  public validationErrors : string[] | undefined;

  constructor(
    private accountService:AccountService,
    private toastr:ToastrService,
    private router:Router
  ) { } 
  
  ngOnInit() {
    this.inizalizeForm();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  } 
  
  inizalizeForm(){
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password:['', [Validators.required,Validators.minLength(4),Validators.maxLength(8)]],
      confirmPassword:['', [Validators.required,this.matchValues('password')]],
      gender:['male', Validators.required],
      knownAs:['', Validators.required],
      dateOfBirth:['', Validators.required],
      city:['', Validators.required],
      country:['', Validators.required],
    });
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
    const dob = this.getDateOnly(this.registerForm.get('dateOfBirth')?.value)
    this.registerForm.patchValue({dateOfBirth :dob});
    this.accountService.register(this.registerForm.value).subscribe({
      next:_=>{ 
        this.router.navigateByUrl('/members')
      },
       error: error=> this.validationErrors = error
    })
  }
  
  cancel(){
    this.cancelRegister.emit(false);
  }

  private getDateOnly(dob:string | undefined){
      if(!dob) return;
      return new Date(dob).toISOString().slice(0,10);
  }
}
