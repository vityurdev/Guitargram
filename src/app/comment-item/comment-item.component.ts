import { AuthService } from './../services/auth.service';
import { Comment } from './../models/comment.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent implements OnInit {
  @Input() comment: Comment;
  userEmail: string;
  userName: string;
  commentContent: string;
  timeStamp: Date = new Date();  

  constructor(private authService: AuthService) {
    authService.authUser().subscribe(user => {});
  }

  ngOnInit(comment = this.comment) {
    this.commentContent = comment.commentMessage;
    this.timeStamp = comment.timeSent;
    this.userEmail = comment.email;
    this.userName = comment.userName;
  }
}
