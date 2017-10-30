export interface Lesson {
    $key?: string;
    name?: string;
    level?: string;
    thumbnailUrl?: string;
    registrationRequired?: boolean;
    premiumRequired?: boolean;
    content?: any[];
}