// Angular Modules
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AuthRoutes} from './auth.routing';

// PrimeNG Modules
import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';
import {MessagesModule} from 'primeng/messages';
import {InputTextModule} from 'primeng/inputtext';
import {MessageModule} from 'primeng/message';
import {DropdownModule} from 'primeng/dropdown';
import {ConfirmationService, MessageService} from 'primeng/api';
import {CaptchaModule} from 'primeng/captcha';

// My Components
import {AppNotfoundComponent} from './app.notfound.component';
import {AppAccessdeniedComponent} from './app.accessdenied.component';
import {TooltipModule} from 'primeng/tooltip';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { PasswordForgotComponent } from './password-forgot/password-forgot.component';
import {AppLoginComponent} from './login/app.login.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {UserUnlockComponent} from './user-unlock/user-unlock.component';
import {UnlockComponent} from './unlock/unlock.component';
import {AppUnderMaintenanceComponent} from './app.under-maintenance.component';
import {SecurityQuestionComponent} from './security-question/security-question.component';
import {CheckboxModule} from 'primeng/checkbox';
import { ChangePasswordComponent } from './login/change-password/change-password.component';
import { SelectInstitutionRoleComponent } from './login/select-institution-role/select-institution-role.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AuthRoutes),
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        PasswordModule,
        ButtonModule,
        MessagesModule,
        MessageModule,
        DropdownModule,
        TooltipModule,
        AutoCompleteModule,
        CaptchaModule,
        CheckboxModule,
    ],
    declarations: [
        AppNotfoundComponent,
        AppAccessdeniedComponent,
        AppLoginComponent,
        PasswordResetComponent,
        PasswordForgotComponent,
        UserUnlockComponent,
        UnlockComponent,
        AppUnderMaintenanceComponent,
        SecurityQuestionComponent,
        ChangePasswordComponent,
        SelectInstitutionRoleComponent
    ],
    providers: [ConfirmationService, MessageService]
})
export class AuthModule {
}
