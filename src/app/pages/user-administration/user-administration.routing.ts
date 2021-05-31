// Angular Router
import {Routes} from '@angular/router';
import {AuthGuard} from '../../shared/guards/auth.guard';
import {UserComponent} from './users/user.component';
import {UserAdministrationComponent} from './user-administration.component';
// My Components

export const UserAdministrationRouting: Routes = [
    {
        path: '',
        component: UserAdministrationComponent,
        children: [
            {
                path: 'users',
                component: UserComponent,
                canActivate: [AuthGuard]
            },

        ]
    }
];
