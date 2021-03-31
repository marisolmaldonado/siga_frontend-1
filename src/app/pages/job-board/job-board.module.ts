import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {JobBoardRoutes} from './job-board.routing';

// PrimeNg Modules
import {TabViewModule} from 'primeng/tabview';

import { CompanyComponent } from './company/company.component';
import { ProfessionalComponent } from './professional/professional.component';
import { PersonalInformationComponent } from './professional/personal-information/personal-information.component';
import { AcademicFormationComponent } from './professional/academic-formation/academic-formation.component';
import {SharedModule} from "../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(JobBoardRoutes),
        SharedModule,
        TabViewModule
    ],
    declarations: [
    CompanyComponent,
    ProfessionalComponent,
    PersonalInformationComponent,
    AcademicFormationComponent
    ],
    providers: [

    ],
})
export class JobBoardModule {
}
