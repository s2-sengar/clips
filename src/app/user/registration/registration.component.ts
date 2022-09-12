import { Component } from '@angular/core';
import { FormGroup ,FormControl, Validators} from '@angular/forms';
import { Iuser } from 'src/app/model/model.user';
import { AuthService } from 'src/app/services/auth.service';

// Importing Custom Validator
import { RegisterValidator } from '../validator/register-validator';
// Importing async Validator
import { EmailTaken } from '../validator/email-taken';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent{

  aleartColor='sky';
  aleartMsg='';
  visible=false;
  disable=false;

  constructor(
    private auth:AuthService,
    private emailTaken:EmailTaken
    ){

  }

  name=new FormControl('',[
    Validators.required,
    Validators.minLength(3)
  ])
  email=new FormControl('',[
    Validators.required,
    Validators.email
  ],[
    // Async Validators
    this.emailTaken.validate
  ]);
  age=new FormControl<Number | null>(null,[
    Validators.required,
    Validators.min(18),
    Validators.max(120)
  ]);
  password=new FormControl('',[
    Validators.required,
    Validators.pattern("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$")
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
  },[
    // Adding Custom Validator
    RegisterValidator.match('password','confirmPassword')
  ]);


  async register(){
    this.aleartColor='blue';
    this.visible=true;
    this.aleartMsg='Wait you are being registered...'
    this.disable=true;
    


    const email= this.registerForm.value.email ? this.registerForm.value.email :' ';
    const password= this.registerForm.value.password ? this.registerForm.value.password :' ';


    try{
      
      await this.auth.registerUser({
        email:this.email.value,
        name:this.name.value,
        password:this.password.value,
        phoneNumber:this.phoneNumber.value,
        age:this.age.value
      } as Iuser)

    }catch(e){
      console.log(e);
      this.aleartColor='red';
      this.aleartMsg='Unexpected Error! Please try again';
      return;
    }
    this.aleartColor='green';
    this.aleartMsg='You have been registered succesfully!';
  }
}
