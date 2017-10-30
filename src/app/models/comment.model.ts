export class Comment {
    $key?: string;
    email?: string;
    userName?: string;
    commentMessage?: string;
    timeSent?: Date = new Date();
    lessonId?: any;
}