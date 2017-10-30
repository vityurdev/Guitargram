import { PremiumComponent } from './app/premium/premium.component';
import { LessonItemComponent } from './app/lesson-item/lesson-item.component';
import { LoginComponent } from './app/login/login.component';
import { SignupComponent } from './app/signup/signup.component';
import { ClassroomComponent } from './app/classroom/classroom.component';
import { HomeComponent } from './app/home/home.component';
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'classroom',
        component: ClassroomComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'lesson/:id',
        component: LessonItemComponent
    },
    {
        path: 'premium',
        component: PremiumComponent
    }
];