// Angular Router
import {Routes} from '@angular/router';
import {AuthGuard} from '../../../shared/guards/auth.guard';
import {UserListComponent} from './user-list.component';

// My Components

export const UserListRouting: Routes = [
    {
        path: '',
        component: UserListComponent,
        canActivate: [AuthGuard]
    }
];
