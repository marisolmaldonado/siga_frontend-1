import { Routes } from '@angular/router';
import {ProfessionalComponent} from "./professional/professional.component";

export const JobBoardRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'professional',
                component: ProfessionalComponent
            }
        ]
    }
];

