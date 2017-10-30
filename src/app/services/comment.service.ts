import { ActivatedRoute } from '@angular/router';
import { Comment } from './../models/comment.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';

@Injectable()
export class CommentService {
  user: firebase.User;
  comments: FirebaseListObservable<Comment[]>;
  comment: Comment;
  userName: Observable<string>;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute
    ) {
        this.afAuth.authState.subscribe(auth => {
          if (auth !== undefined && auth !== null) {
            this.user = auth;
          }
        });
    }

    getUser() {
      const userId = this.user.uid;
      const path = `/users/${userId}`;
      return this.db.object(path);
    }

  sendComment(comment: string, lessonId: any, userName: string) {
    const timestamp = this.getTimeStamp();
    const email = this.user.email;
    this.comments = this.getComments();

    this.comments.push({
      commentMessage: comment,
      timeSent: timestamp,
      userName: userName,
      email: email,
      lessonId: lessonId
    })
  }

  getComments(): FirebaseListObservable<Comment[]> {
    return this.db.list('comments');
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
                 (now.getUTCMonth() + 1) + '/' +
                 now.getUTCDate();
    const time = now.getUTCHours() + ':' +
                 now.getUTCMinutes() + ':' +
                 now.getUTCSeconds();

    return (date + ' ' + time);
  };
}
