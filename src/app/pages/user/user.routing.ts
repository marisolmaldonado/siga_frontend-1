// Angular Router
import {Routes} from '@angular/router';
// My Components
import {AdministrationComponent} from './administration/administration.component';
import {ProfileComponent} from './profile/profile.component';

export const UserRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'administration',
                component: AdministrationComponent
            },
            {
                path: 'profile',
                component: ProfileComponent
            },
        ]
    }
];
