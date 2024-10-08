import { ChangeDetectorRef, Component, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { ToastrService } from 'ngx-toastr';
import { TimeagoModule } from 'ngx-timeago';
import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { PhotoEditorComponent } from '../photo-editor/photo-editor.component';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
  standalone: true,
  imports:[TimeagoModule,DatePipe,NgIf,NgFor,TabsModule,FormsModule,PhotoEditorComponent,CommonModule], 
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm?: NgForm;
  @HostListener('window:beforeunload', ['$event']) onBeforeUnloadEvent($event: any) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }

  member?: Member;
  profilePhoto = this.member?.photos.find(photo => photo.isMain)?.data
  constructor(
    private memberservice: MembersService, 
    private toaster: ToastrService,
    private cdr: ChangeDetectorRef
  ) {}
   accountService = inject(AccountService)
  ngOnInit(): void {
    this.loadMember();
  }

  async loadMember() {
    let user = this.accountService.currentUser();
      if (user) {
        this.member = await lastValueFrom(this.memberservice.getMember(user.username));
        this.cdr.detectChanges(); // Trigger change detection to prevent the ExpressionChangedAfterItHasBeenCheckedError
      }
   
  }

  updateMember() {
    this.memberservice.updateMember(this.editForm?.value).subscribe({
      next: () => {
        this.toaster.success('Profile Updated Successfully');
        this.editForm?.reset(this.member);
      },
    });
  }

  onMemberChange(event:Member){
    this.member = event;
  }
}
