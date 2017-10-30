import { LessonService } from './../services/lesson.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lesson-item',
  templateUrl: './lesson-item.component.html',
  styleUrls: ['./lesson-item.component.css']
})
export class LessonItemComponent implements OnInit {
  lessonContent: any[];
  lessonName: string;

  constructor(private lessonService: LessonService,
    private route: ActivatedRoute) { }

    getLessonContent(id: number) {
      this.lessonService.getLesson(id)
        .then(lessonItem => {
          this.lessonContent = lessonItem.content;
          this.lessonName = lessonItem.name; 
        })
    }
  
    ngOnInit() {
      this.getLessonContent(this.route.snapshot.params['id']);
    }
}
