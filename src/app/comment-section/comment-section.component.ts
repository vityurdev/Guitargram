import { ActivatedRoute } from '@angular/router';
import { CommentService } from './../services/comment.service';
import { Comment } from './../models/comment.model';
import { FirebaseListObservable } from 'angularfire2/database';
import { Component, OnInit, OnChanges } from '@angular/core';


@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})
export class CommentSectionComponent implements OnInit, OnChanges {
  comments: FirebaseListObservable<Comment[]>;
  currentLessonId;

  constructor(private commentService: CommentService,
    private route: ActivatedRoute) {
      this.currentLessonId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.comments = this.commentService.getComments();
  }

  ngOnChanges() {
    this.comments = this.commentService.getComments();
  }
}
