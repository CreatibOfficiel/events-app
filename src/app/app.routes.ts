import { Routes } from '@angular/router';
import { FeedComponent } from './pages/feed/feed.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SearchComponent } from './pages/search/search.component';
import {LoginComponent} from "./pages/auth/login/login.component";
import {RegisterComponent} from "./pages/auth/register/register.component";

export const routes: Routes = [
    { path: '', component: FeedComponent },
    { path: 'calendar', component: CalendarComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'search', component: SearchComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
];
