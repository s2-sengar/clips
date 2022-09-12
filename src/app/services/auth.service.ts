import { Injectable } from '@angular/core';
// Firebase
import { AngularFireAuth } from '@angular/fire/compat/auth';
// FireDatabse
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { delay, filter, Observable, of, switchMap } from 'rxjs';
import { map } from 'rxjs';

// Router
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NavigationEnd } from '@angular/router';


import { Iuser } from '../model/model.user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userCollection:AngularFirestoreCollection<Iuser>;
  public isAuthenticated$:Observable<boolean>;
  public isAuthenticatedWithDelay$:Observable<boolean>;
  private redirect:boolean=false;
  constructor(
    private auth:AngularFireAuth,
    private db:AngularFirestore,
    private router:Router,
    private route:ActivatedRoute 
    ) { 
      this.userCollection=db.collection('users');

      // user observable
      this.isAuthenticated$=auth.user.pipe(
        map(user=>!!user)
      )
      this.isAuthenticatedWithDelay$=this.isAuthenticated$.pipe(
        delay(1000)
      )
      
      // Fetching data from route
      /**
       * Reading data from a route 
       */
      this.router.events
      .pipe(
        filter(e=>e instanceof NavigationEnd),
        map(e=>this.route.firstChild),
        switchMap(route=>route?.data ?? of({}))
      )
      .subscribe(data=>{
        this.redirect=data?.['authOnly'] ?? false;
      });

    }

  async registerUser(userData:Iuser){
    if(!userData.password){
      throw new Error("Password Not Found");
      
    }
    const userCred=await this.auth.createUserWithEmailAndPassword(
      userData.email,userData.password
    );
  
    if(!userCred.user){
      throw new Error("User can't be found");
      
    }

    await this.userCollection.doc(userCred.user.uid).set(
      {
        name:userData.name,
        email:userData.email,
        age:userData.age,
        phoneNumber:userData.phoneNumber
      }
    )
// Updating user profile
    await userCred.user.updateProfile(
      {
        displayName:userData.name
      }
    )
  }

  async logout($event:Event){
    $event.preventDefault();
    await this.auth.signOut();

    if(this.redirect){
      await this.router.navigateByUrl('/');
    }
  }
}
