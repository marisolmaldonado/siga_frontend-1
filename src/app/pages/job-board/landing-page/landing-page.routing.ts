// Angular Router
import {Routes} from '@angular/router';
import {AuthGuard} from '../../../shared/guards/auth.guard';
import {LandingPageComponent} from './landing-page.component';

// My Components

export const LandingPageRouting: Routes = [
    {
        path: '',
        component: LandingPageComponent,
        canActivate: [AuthGuard]
    }
];
