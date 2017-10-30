import { Lesson } from './../models/lesson.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';

@Injectable()
export class LessonService {
  private uid: string;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) { 
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.uid = auth.uid;
      }
    })
  }

  getLessons() : FirebaseListObservable<Lesson[]> {
    return this.db.list('lessons');
  }

  getLesson(key: number) {
    return firebase.database().ref('lessons/' + key).once('value')
      .then((snap) => snap.val());
  }
}
