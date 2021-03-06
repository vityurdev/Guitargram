import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  private authState: any;

  constructor(private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router) {
      this.user = afAuth.authState;
  }

  authUser() {
    return this.user;
  }

  get currentUserId(): string {
    return this.authState !== null ? this.authState.uid : '';
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        this.router.navigate(['classroom']);
      })
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['']);
  }

  signUp(email: string, password: string, displayName: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;      
        this.setUserData(email, displayName, false);
      }).catch(error => console.log(error));
  }

  setUserData(email:string, displayName: string, isPremium: boolean) {
    const path = 'users/' + this.currentUserId;
    const data = {
      email: email,
      displayName: displayName,
      isPremium: false
    };

    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }
}
