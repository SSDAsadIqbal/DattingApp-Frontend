import { Component, inject, Inject, OnInit } from '@angular/core'; 
import { MembersService } from 'src/app/_services/members.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { MemberCardComponent } from '../member-card/member-card.component';
import { AccountService } from 'src/app/_services/account.service';
import { UserParams } from 'src/app/_models/userParams';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
  standalone:true,
  imports:[PaginationModule,MemberCardComponent,FormsModule,ButtonsModule]
})
export class MemberListComponent implements OnInit {

  constructor(public memberService : MembersService) { } 
  genderList = [{value: 'male', Display:'Males'},{value: 'female', Display:'Females'}]

  ngOnInit() {
    if(!this.memberService.paginatedResult()) this.loadMembers(); 
  }
 
  loadMembers(){
    this.memberService.getMembers(); 
  }

  resetFilter(){
    this.memberService.resetUserParams();
    this.loadMembers();
  }

  pageChange(event:any){
    if(this.memberService.userparams().pageNumber !== event.page){
      this.memberService.userparams().pageNumber = event.page;
      this.loadMembers();
    }
  }
}
