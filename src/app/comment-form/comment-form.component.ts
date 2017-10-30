import { AuthService } from './../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from './../services/comment.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
  comment: string;
  user: Observable<firebase.User>;
  userName: string;

  constructor(private commentService: CommentService, private authService: AuthService,
    private route: ActivatedRoute) { 
      this.user = this.authService.authUser();
  }

  ngOnInit() {
    this.user.subscribe(user => {
      if (user) {
        this.commentService.getUser().subscribe(user => {
          this.userName = user.displayName;
        })
      }
    })
  }

  send() {
    let lessonId = this.route.snapshot.params['id'];

    this.commentService.sendComment(this.comment, lessonId, this.userName);
    this.comment = '';
  }
}
