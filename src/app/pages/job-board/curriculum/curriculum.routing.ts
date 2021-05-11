// Angular Router
import {Routes} from '@angular/router';
import {CurriculumComponent} from './curriculum.component';
// import {AuthGuard} from "../../shared/guards/auth.guard";

// My Components

export const CurriculumRouting: Routes = [
    {
        path: '',
        children: [
            {
                path: 'curriculum',
                component: CurriculumComponent
            },
        ]
    }
];
