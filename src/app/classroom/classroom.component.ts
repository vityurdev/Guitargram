import { ActivatedRoute, Router } from '@angular/router';
import { Lesson } from './../models/lesson.model';
import { FirebaseListObservable } from 'angularfire2/database';
import { PremiumService } from './../services/premium.service';
import { LessonService } from './../services/lesson.service';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit, OnChanges {
  isUserPremium: boolean;
  isUserLoggedIn: boolean;
  user: Observable<firebase.User>;
  
  lessons: FirebaseListObservable<Lesson[]>;
  lessonLevel: string;

  constructor(private authService: AuthService, private lessonService: LessonService, 
    private premiumService: PremiumService, private route: ActivatedRoute, private router: Router) { 
      this.user = this.authService.authUser();
  }

  ngOnInit() {
    this.user.subscribe(user => {
      if (user) {
        this.isUserLoggedIn = true;

        this.premiumService.getUser().subscribe(user => {
          this.isUserPremium = user.isPremium;
        })
      }
      else {
        this.isUserLoggedIn = false;
      }
    })
    
    if (this.route.snapshot.queryParams['level'] == undefined || this.route.snapshot.queryParams['level'] == null) {
      this.lessonLevel = 'all'
    } 
    else {
      this.lessonLevel = this.route.snapshot.queryParams['level'];
    } 
    
    this.lessons = this.lessonService.getLessons();
  }

  ngOnChanges() {
    this.lessons = this.lessonService.getLessons();
  }

  showLessonsWithLevel(lessonLevel: string) {
    this.lessonLevel = lessonLevel;

    if (lessonLevel == 'all') {
      this.router.navigate(['/classroom'], {queryParams: {}});
    } 
    else {
      this.router.navigate(['/classroom'], {queryParams: {level: lessonLevel} });
    }   
  }

}
