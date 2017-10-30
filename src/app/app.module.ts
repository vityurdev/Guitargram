import { CommentService } from './services/comment.service';
import { PremiumService } from './services/premium.service';
import { LessonService } from './services/lesson.service';
import { environment } from './../environments/environment';
import { appRoutes } from './../routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ClassroomComponent } from './classroom/classroom.component';

import { AuthService } from './services/auth.service';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { LessonItemComponent } from './lesson-item/lesson-item.component';
import { PremiumComponent } from './premium/premium.component';
import { CommentSectionComponent } from './comment-section/comment-section.component';
import { CommentItemComponent } from './comment-item/comment-item.component';
import { CommentFormComponent } from './comment-form/comment-form.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ClassroomComponent,
    SignupComponent,
    LoginComponent,
    LessonItemComponent,
    PremiumComponent,
    CommentSectionComponent,
    CommentItemComponent,
    CommentFormComponent,
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,                               
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    LessonService,
    PremiumService,
    CommentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
