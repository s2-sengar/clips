import { Component } from '@angular/core';
import { FormGroup ,FormControl, Validators} from '@angular/forms';

// Firebase
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent{

  aleartColor='';
  aleartMsg='';
  visible=false;

  constructor(private auth:AngularFireAuth){

  }

  name=new FormControl('',[
    Validators.required,
    Validators.minLength(3)
  ])
  email=new FormControl('',[
    Validators.required,
    Validators.email
  ]);
  age=new FormControl('',[
    Validators.required,
    Validators.min(18),
    Validators.max(120)
  ]);
  password=new FormControl('',[
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
  ]);
  confirmPassword=new FormControl('',[
    Validators.required
  ]);
  phoneNumber=new FormControl('',[]);

  registerForm=new FormGroup({
    name:this.name,
    email:this.email,
    age:this.age,
    password:this.password,
    confirmPassword:this.confirmPassword,
    phoneNumber:this.phoneNumber
  });


  async register(){
    this.aleartColor='blue';
    this.visible=true;
    this.aleartMsg='Wait you are being registered...'
    console.log('Register is Called')
    
    let email='',password='';
    email=this.registerForm.value.email;
    password=this.registerForm.value.password;

    const userCred=await this.auth.createUserWithEmailAndPassword(
        email,password
    );
  }

}
