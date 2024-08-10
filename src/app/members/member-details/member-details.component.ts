import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';


@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html', 
  imports:[TabsModule,GalleryModule,CommonModule],
  standalone: true,
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {

  constructor(private memberService:MembersService,private route:ActivatedRoute) { }
  public member :Member | undefined;
  images:GalleryItem[]= [];
  ngOnInit() { 
    this.loadMember();
  }

  loadMember() {
    let member = this.route.snapshot.paramMap.get('userName');
    if(!member) return;
    debugger
    this.memberService.getMember(member).subscribe({
      next: member => {
        this.member = member,
        member.photos.map(photos =>{
           this.images.push(new ImageItem({src:photos.data,thumb:photos.data}));
        })
      }
    })
  }

  photo(){
    return this.member?.photos.find(p=>p.isMain === true)?.data
  
  }
}
