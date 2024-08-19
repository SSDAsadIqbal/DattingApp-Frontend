import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Member } from 'src/app/_models/member';
import { Photo } from 'src/app/_models/photo';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',  
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent {
  @Input() members:  Member[] | undefined;

  mainPhoto(member: Member) { 
    var s = member.photos.find(p => p.isMain)?.data; // Finds the photo marked as main and retrieves its data
    return s; // Returns the data of the main photo
  }
}
