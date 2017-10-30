import { PremiumService } from './../services/premium.service';
import { LessonService } from './../services/lesson.service';
import { User } from './../models/user.model';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: Observable<firebase.User>;
  userEmail: string;
  userName: string;
  isUserPremium: boolean;

  constructor(private authService: AuthService, private premiumService: PremiumService) {
    this.user = this.authService.authUser();
  }

  ngOnInit() {
    this.user.subscribe(user => {
      if (user) {    
        this.userEmail = user.email;

        this.premiumService.getUser().subscribe(user => {
          this.userName = user.displayName;
          this.isUserPremium = user.isPremium;
        })
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  toggleMenu() {
    var x = document.getElementById('myTopnav');
    if (x.className === 'topnav') {
        x.className += ' responsive';
    } else {
        x.className = 'topnav';
    }
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    var elem = document.getElementById('myTopnav');
    
    if (window.scrollY > elem.offsetHeight) {
      elem.className += ' unopaque-fixed';
    } else {
      elem.className = 'topnav';
    }
  }
}
