import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { delay, last, switchMap } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

// Naming using uuid
import {v4 as uuid} from 'uuid'
import { ClipService } from 'src/app/services/clip.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {


  isDragover=false;
  isUploaded=false;

  disable = false;
  alertColor='';
  alertMsg='';
  showAlert=false;

  file : File | null =null;


  percentage=0;
  showPercentage=false;

  user:firebase.User | null=null;

  title=new FormControl('',{
    validators:[
      Validators.required,
      Validators.minLength(3)
    ],
    nonNullable:true
  })
  uploadFormGroup=new FormGroup({
    title:this.title
  })

  constructor(
    private storage:AngularFireStorage,
    private auth:AngularFireAuth,
    private clipService:ClipService
  ) { 
    auth.user.subscribe((user)=>{
      this.user=user;
    })

  }

  ngOnInit(): void {
  }

  storeFile(event:Event){
    this.isDragover=false;

    this.file=(event as DragEvent ).dataTransfer ?
              (event as DragEvent ).dataTransfer?.files.item(0) ?? null :
              (event.target as HTMLInputElement).files?.item(0) ?? null;
    
    if(!this.file || this.file.type!='video/mp4'){
      return;
    }
    this.title.setValue(
      this.file.name.replace(/\.[^/.]+$/,'')
    )
    this.isUploaded=true;

  }
  uploadFile(){

    // Disable a from group
    this.uploadFormGroup.disable(); 



    const clipFileName=uuid();
    const clipsPath=`clips/${clipFileName}.mp4`
    this.alertColor='blue';
    this.disable=true;
    this.showAlert=true;
    this.alertMsg="File is getting uploaded.."
    this.showPercentage=true;

    const task= this.storage.upload(clipsPath,this.file);
    const clipRef=this.storage.ref(clipsPath)


    task.percentageChanges().subscribe((percentage)=>{
      this.percentage=(percentage ?? 0)/100;
    });

    task.snapshotChanges().pipe(
      last(),
      switchMap(()=>clipRef.getDownloadURL())
    ).subscribe({
      next:(url)=>{
        const clipData={
          uid:this.user?.uid as string,
          displayName:this.user?.displayName as string,
          title:this.title.value,
          fileName:`${clipFileName}.mp4`,
          url
        }
        
        this.clipService.createClip(clipData);

        console.log(clipData);

        this.alertColor='green';
        this.showPercentage=false;
        this.alertMsg='File Upload Success! Your clip is ready for share.'
      },
      error:(error)=>{
        this.uploadFormGroup.enable();
        this.alertColor='red';
        this.disable=false;
        this.alertMsg='File Upload failed! Please try again later.';
        this.showPercentage=false;
      }
    });
  }

}
