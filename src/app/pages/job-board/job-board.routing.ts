// Angular Router
import {Routes} from '@angular/router';
import {AuthGuard} from '../../shared/guards/auth.guard';
import {ProfessionalComponent} from './professional/professional.component';

// My Components

export const JobBoardRouting: Routes = [
    {
        path: '',
        children: [
            {
                path: 'professional',
                loadChildren: () => import('./professional/professional.module').then(m => m.ProfessionalModule),
                canActivate: [AuthGuard]
            },
        ]
    }
];
