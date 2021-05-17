// Angular Router
import {Routes} from '@angular/router';
import {AuthGuard} from '../../../shared/guards/auth.guard';
import {UsersComponent} from './users.component';

// My Components

export const UsersRouting: Routes = [
    {
        path: '',
        component: UsersComponent,
        canActivate: [AuthGuard]
    }
];
