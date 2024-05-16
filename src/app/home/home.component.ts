import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users:any; 
  constructor(private http:HttpClient){}


  ngOnInit(): void {
    this.getUsers();
  }


  registerMode = false;
  RegisterToggle() {
    this.registerMode = !this.registerMode;
  }

  
  getUsers() {
    this.http.get('http://192.168.1.115:5000/api/v1/Users/GetUsers').subscribe({
      next: response => this.users = response,
      error: error => console.log(error),
      complete: () => { console.log('Request has completed') },
    })
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }
}
