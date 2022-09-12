import { Component, OnInit } from '@angular/core';

import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userCred={
    email:'',
    password:''
  }
  
  aleartColor:string='blue';
  aleartMsg='';
  visible=false;
  disable=false;

  email=new FormControl('',[
    Validators.required,
    Validators.email
  ]);
  password=new FormControl('',[
    Validators.required,
    Validators.pattern("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$")
  ]);

  loginForm=new FormGroup({
    email:this.email,
    password:this.password
  })


  constructor(
    private auth:AngularFireAuth
  ) { }

  ngOnInit(): void {
  }
   

  async login(){
    this.userCred.email = this.email.value ? this.email.value : ' ';
    this.userCred.password = this.password.value ? this.password.value : ' ';
    try{
      this.disable=true;
      this.aleartMsg='Fetching User';
      this.aleartColor='blue';
      this.visible=true;
      await this.auth.signInWithEmailAndPassword(
        this.userCred.email,this.userCred.password
      )
    }catch(e){
      this.disable=false;
      this.aleartMsg='Invalid Email or Password'
      this.visible=true;
      this.aleartColor='red';
      return;
    }
    this.visible=true;
    this.disable=false;
    this.aleartColor='green';
    this.aleartMsg='Login Successfull';
  }

}
