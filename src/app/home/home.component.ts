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
  }


  registerMode = false;
  RegisterToggle() {
    this.registerMode = !this.registerMode;
  }

  

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }
}
