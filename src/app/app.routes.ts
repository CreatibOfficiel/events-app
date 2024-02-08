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
import { TagsManagementComponent } from './pages/admin/tags/tags-management/tags-management.component';
import { UserManagementComponent } from './pages/admin/user/user-management/user-management.component';
import { EditUserComponent } from './pages/admin/user/edit-user/edit-user.component';
import { SelectTagsComponent } from './pages/select-tags/select-tags.component';
import { SelectUserTypeComponent } from './pages/select-user-type/select-user-type.component';
import { EventManagementComponent } from './pages/admin/event/event-management/event-management.component';
import { EditEventComponent } from './pages/admin/event/edit-event/edit-event.component';
import { CreateEventComponent } from './pages/event/create-event/create-event.component';
import { AdminPanelComponent } from './pages/admin/admin-panel/admin-panel.component';
import { CompanyDetailComponent } from './pages/company/company-detail/company-detail.component';
import {CompanyPanelComponent} from "./pages/company-mode/company-panel/company-panel.component";
import { adminGuard } from './guards/admin.guard';
import { companyGuard } from './guards/company.guard';


export const routes: Routes = [
    { path: '', component: FeedComponent, canActivate: [authGuard] },
    { path: 'calendar', component: CalendarComponent, canActivate: [authGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
    { path: 'search', component: SearchComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'event/detail/:id', component: EventDetailComponent, canActivate: [authGuard] },
    { path: 'company/create', component: CreateCompanyComponent, canActivate: [authGuard] },
    { path: 'company/edit/:id', component: EditCompanyComponent, canActivate: [authGuard, companyGuard]},
    { path: 'select-tags', component: SelectTagsComponent },
    { path: 'select-user-type', component: SelectUserTypeComponent },
    { path: 'company/panel', component: CompanyPanelComponent, canActivate: [authGuard, companyGuard]},
    { path: 'company/events', component: EventManagementComponent, canActivate: [authGuard, companyGuard]},
    { path: 'event/create', component: CreateEventComponent, canActivate: [authGuard]},
    { path: 'company/detail/:id', component: CompanyDetailComponent, canActivate: [authGuard] },
    { path: 'admin/company/validate', component: ValidateCompanyComponent, canActivate: [authGuard, adminGuard] },
    { path: 'admin/tags', component: TagsManagementComponent, canActivate: [authGuard, adminGuard] },
    { path: 'admin/users', component: UserManagementComponent, canActivate: [authGuard, adminGuard]},
    { path: 'admin/user/edit/:id', component: EditUserComponent, canActivate: [authGuard, adminGuard] },
    { path: 'admin/event/edit/:id', component: EditEventComponent, canActivate: [authGuard, adminGuard] },
    { path: 'admin/panel', component: AdminPanelComponent, canActivate: [authGuard, adminGuard]},
    { path: 'admin/events', component: EventManagementComponent, canActivate: [authGuard, adminGuard]},

];
