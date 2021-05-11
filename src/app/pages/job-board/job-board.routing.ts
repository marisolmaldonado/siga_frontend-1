// Angular Router
import {Routes} from '@angular/router';
// import {AuthGuard} from "../../shared/guards/auth.guard";
// My Components

export const JobBoardRouting: Routes = [
    {
        path: '',
        children: [
            {
                path: 'curriculum',
                loadChildren: () => import('./curriculum/curriculum.module').then(m => m.CurriculumModule)
            },
        ]
    }
];
