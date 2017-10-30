import { Router } from '@angular/router';
import { PremiumService } from './../services/premium.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-premium',
  templateUrl: './premium.component.html',
  styleUrls: ['./premium.component.css']
})

export class PremiumComponent {
  premiumCode: string;
  errorMessageVisible: boolean;
  userUpgraded: boolean;
  
  user: Observable<firebase.User>;

  constructor (private premiumService: PremiumService, private router: Router) { }

  getUserStatus() {
    this.premiumService.getUser().subscribe(user => {
      var status = user.isPremium;
      console.log(status);

      return status;
    });
  }

  redirectToClassroom() {
    this.router.navigate(['classroom']);
  }

  upgradeUser(){
    if (this.premiumCode == '12345') {
      this.premiumService.getUser().update({
        isPremium: true
      });

      this.errorMessageVisible = false;
      this.userUpgraded = true;

      setTimeout(() => {
        this.router.navigate(['classroom']);
      }, 1500);
    } 
    else {
      this.errorMessageVisible = true;
    }   
  }
}
