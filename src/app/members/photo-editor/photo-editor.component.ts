import { DecimalPipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, inject, input, OnInit, output } from '@angular/core';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { Member } from 'src/app/_models/member';
import { Photo } from 'src/app/_models/photo';
import { AccountService } from 'src/app/_services/account.service'; 
import { MembersService } from 'src/app/_services/members.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-editor',
  standalone: true,
  imports: [NgIf,NgFor,NgStyle,NgClass,FileUploadModule,DecimalPipe],
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.css'
})
export class PhotoEditorComponent implements OnInit {
  private accountService = inject(AccountService);
  member = input.required<Member>();
  memberChage = output<Member>();
  uploader?:FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;

  constructor(private memberservice: MembersService){}

  ngOnInit(): void {
    this.initializeUpLoader();
  }

  fileOverBase(event:any){
    this.hasBaseDropZoneOver = event;
  }
 
  setMainPhoto(photo: Photo){
    this.memberservice.setMainPhoto(photo.id).subscribe({
      next:_ =>{
        const user = this.accountService.currentUser();
        if(user){
          user.userPhotoUrl = photo.data;
          this.accountService.setCurrentUser(user);
        }
        const updatedMember = {...this.member()}
        let photox = updatedMember.photos?.filter(photo => photo.isMain == true) 
        photox[0].data = photo.data;
        this.memberChage.emit(updatedMember) 
      } 
    })
  }

  deletePhoto(photoId: number){
    this.memberservice.deletePhoto(photoId).subscribe({
      next:_ =>{
        const updatedMember = {...this.member()}
        updatedMember.photos = updatedMember.photos?.filter(photo => photo.id != photoId) 
        this.memberChage.emit(updatedMember)
      } 
    })
  }
  

  initializeUpLoader(){
    const userString= localStorage.getItem('user');
    const user = JSON.parse(userString!) 
    this.uploader = new FileUploader({
      url: this.baseUrl + 'Users/AddPhoto',
      authToken: `Bearer ${user.token}`,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload:true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (file)=>{
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item,response,status,headers)=>{
      const photo = JSON.parse(response);
      const updateMember = {...this.member()};
      updateMember.photos.push(photo);
      this.memberChage.emit(updateMember);
      if(photo.isMain){
        const user = this.accountService.currentUser();
        if(user){
          user.userPhotoUrl = photo.data;
          this.accountService.setCurrentUser(user);
      }
      let photox = updateMember.photos?.filter(photo => photo.isMain == true) 
        photox[0].data = photo.data;
        this.memberChage.emit(updateMember) 
    }
   }
  } 
}
