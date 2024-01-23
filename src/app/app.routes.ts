import { Routes } from '@angular/router';
import { FeedComponent } from './pages/feed/feed.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SearchComponent } from './pages/search/search.component';
import {LoginComponent} from "./pages/auth/login/login.component";
import {RegisterComponent} from "./pages/auth/register/register.component";
import { EventDetailComponent } from './pages/event-detail/event-detail.component';
import { authGuard } from './guards/auth.guard';
import { CreateCompanyComponent } from './pages/company/create-company/create-company.component';
import { EditCompanyComponent } from './pages/company/edit-company/edit-company.component';
import { ValidateCompanyComponent } from './pages/admin/company/validate-company/validate-company.component';


export const routes: Routes = [
    { path: '', component: FeedComponent, canActivate: [authGuard] },
    { path: 'calendar', component: CalendarComponent, canActivate: [authGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
    { path: 'search', component: SearchComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'event/:id', component: EventDetailComponent, canActivate: [authGuard] },
    { path: 'company/create', component: CreateCompanyComponent, canActivate: [authGuard] },
    { path: 'company/edit/:id', component: EditCompanyComponent, canActivate: [authGuard]},
    { path: 'admin/company/validate', component: ValidateCompanyComponent, canActivate: [authGuard] },
];
