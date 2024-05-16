import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css']
})
export class TestErrorComponent {
baseUrl= 'http://192.168.1.115:5000/api/v1/'
validationErrors:string[] =[];
constructor(private http:HttpClient){}

get500Error(){
  this.http.get(this.baseUrl + 'BuggyContoller/GetServerError').subscribe({
    next:res=> console.log(res),
    error:err=>console.log(err)
  })
}

get400Error(){
  this.http.get(this.baseUrl + 'BuggyContoller/GetBadRequest').subscribe({
    next:res=> console.log(res),
    error:err=>console.log(err)
  })
}

get404Error(){
  this.http.get(this.baseUrl + 'BuggyContoller/GetNotFound').subscribe({
    next:res=> console.log(res),
    error:err=>console.log(err)
  })
}

get401Error(){
  this.http.get(this.baseUrl + 'BuggyContoller/Login').subscribe({
    next:res=> console.log(res),
    error:err=>console.log(err)
  })
}

get400ValidationError(){
  this.http.post(this.baseUrl + 'Account/Register',{}).subscribe({
    next:res=> console.log(res),
    error:errors=>{
      console.log(errors);
      this.validationErrors = errors;
    }
  })
}




}
