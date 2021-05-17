// Angular Router
import {Routes} from '@angular/router';
import {AuthGuard} from '../../shared/guards/auth.guard';
// My Components

export const UserAdministrationRouting: Routes = [
    {
        path: '',
        children: [
            {
                path: 'user-list',
                loadChildren: () => import('./users-list/user-list.module').then(m => m.UserListModule),
                canActivate: [AuthGuard]
            },

        ]
    }
];
