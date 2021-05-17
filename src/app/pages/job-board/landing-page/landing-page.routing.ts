// Angular Router
import {Routes} from '@angular/router';
import {AuthGuard} from '../../../shared/guards/auth.guard';
import {LandingPageComponent} from './landing-page.component';
import {WebOfferComponent} from './web-offer/web-offer.component';

// My Components

export const LandingPageRouting: Routes = [
    {
        path: '',
        component: WebOfferComponent,
        canActivate: [AuthGuard]
    }
];
