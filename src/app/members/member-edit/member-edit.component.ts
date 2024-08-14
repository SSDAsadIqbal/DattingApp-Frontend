import { ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm?: NgForm;
  @HostListener('window:beforeunload', ['$event']) onBeforeUnloadEvent($event: any) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }

  member?: Member;

  constructor(
    private memberservice: MembersService,
    private accountService: AccountService,
    private toaster: ToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.accountService.currentUser$.subscribe(async (user) => {
      if (user) {
        this.member = await lastValueFrom(this.memberservice.getMember(user.username));
        this.cdr.detectChanges(); // Trigger change detection to prevent the ExpressionChangedAfterItHasBeenCheckedError
      }
    });
  }

  updateMember() {
    this.memberservice.updateMember(this.editForm?.value).subscribe({
      next: () => {
        this.toaster.success('Profile Updated Successfully');
        this.editForm?.reset(this.member);
      },
    });
  }
}
