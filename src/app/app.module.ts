import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UserModule } from './user/user.module';
import { NavComponent } from './nav/nav.component';


// Setting up firebase
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
// Authentication
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component'
// For Video Upload
import {AngularFireStorageModule} from '@angular/fire/compat/storage'

// Import Video Routing
import { VideoModule } from './video/video.module';
import { ClipComponent } from './clip/clip.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    AboutComponent,
    ClipComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    UserModule,
    // initializing firebase
    AngularFireModule.initializeApp(environment.firebase),
    // Authentication
    AngularFireAuthModule,
    // Angular Database
    AngularFirestoreModule,

    VideoModule,

    AppRoutingModule,
    AngularFireStorageModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
