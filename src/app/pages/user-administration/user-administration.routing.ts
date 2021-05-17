// Angular Router
import {Routes} from '@angular/router';
import {AuthGuard} from '../../shared/guards/auth.guard';
// My Components

export const UserAdministrationRouting: Routes = [
    {
        path: '',
        children: [
            {
                path: 'users',
                loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
                canActivate: [AuthGuard]
            },

        ]
    }
];
