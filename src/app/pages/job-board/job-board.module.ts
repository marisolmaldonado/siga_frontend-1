// Angular Modules
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {JobBoardRouting} from './job-board.routing';

// PrimeNG Modules
import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {SkeletonModule} from 'primeng/skeleton';

// My Components
import {TooltipModule} from 'primeng/tooltip';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {FileUploadModule} from 'primeng/fileupload';
import {TableModule} from 'primeng/table';
import {RatingModule} from 'primeng/rating';
import {DialogModule} from 'primeng/dialog';
import {InputNumberModule} from 'primeng/inputnumber';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {PaginatorModule} from 'primeng/paginator';
import {KeyFilterModule} from 'primeng/keyfilter';
import {TabPanel, TabViewModule} from 'primeng/tabview';
import {TreeModule} from 'primeng/tree';
import {AccordionModule} from 'primeng/accordion';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {CardModule} from 'primeng/card';
import {SharedModule} from '../shared/shared.module';
import {JobBoardComponent} from './job-board.component';
import {CompanyComponent} from './company/company.component';
import {WebOfferComponent} from './landing-page/web-offer/web-offer.component';
import {WebProfessionalComponent} from './landing-page/web-professional/web-professional.component';
import {ProfessionalComponent} from './professional/professional.component';
import {SkillComponent} from './professional/skill/skill.component';
import { OfferComponent } from './company/offer/offer.component';
import { ProfileComponent } from './company/profile/profile.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(JobBoardRouting),
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        PasswordModule,
        ButtonModule,
        DropdownModule,
        TooltipModule,
        AutoCompleteModule,
        ToastModule,
        ToolbarModule,
        FileUploadModule,
        TableModule,
        RatingModule,
        DialogModule,
        InputNumberModule,
        ConfirmDialogModule,
        InputTextareaModule,
        TooltipModule,
        DropdownModule,
        PaginatorModule,
        KeyFilterModule,
        TabViewModule,
        TreeModule,
        AccordionModule,
        OverlayPanelModule,
        SharedModule,
        CardModule,
        SkeletonModule,
    ],
    declarations: [
        JobBoardComponent,
        ProfessionalComponent,
        SkillComponent,
        CompanyComponent,
        WebOfferComponent,
        WebProfessionalComponent,
        OfferComponent,
        ProfileComponent,
        LandingPageComponent
    ],
    providers: []
})
export class JobBoardModule {
}
