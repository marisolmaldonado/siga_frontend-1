import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../../environments/environment';
import {AuthHttpService} from '../../../services/auth/auth-http.service';
import {MessageService} from '../../../services/app/message.service';

@Component({
    selector: 'app-user-unlocked',
    templateUrl: './user-unlocked.component.html',
    styleUrls: ['./user-unlocked.component.scss']
})
export class UserUnlockedComponent implements OnInit {
    dark: boolean;
    checked: boolean;
    formPasswordReset: FormGroup;
    flagPasswordReset: boolean;
    SITE_KEY: string;

    constructor(private authHttpService: AuthHttpService,
                private spinnerService: NgxSpinnerService,
                private messageService: MessageService,
                private router: Router,
                private formBuilder: FormBuilder) {
        this.SITE_KEY = environment.SITE_KEY;
    }

    ngOnInit(): void {
        this.buildFormPasswordReset();
    }

    buildFormPasswordReset() {
        this.formPasswordReset = this.formBuilder.group({
            username: ['', Validators.required]
        });
    }

    onSubmitForgotPassword(event: Event, grecaptcha) {
        event.preventDefault();
        if (this.formPasswordReset.valid) {
            this.forgotPassword(grecaptcha);
        } else {
            this.formPasswordReset.markAllAsTouched();
        }
    }

    forgotPassword(grecaptcha) {
        this.spinnerService.show();
        this.authHttpService.userUnlock(this.formPasswordReset.controls['username'].value).subscribe(response => {
            this.spinnerService.hide();
            this.flagPasswordReset = false;
            grecaptcha.reset();
            this.messageService.success(response);
        }, error => {
            this.spinnerService.hide();
            this.flagPasswordReset = false;
            grecaptcha.reset();
            this.messageService.error(error);
        });
    }

    showResponse() {
        this.flagPasswordReset = true;
    }

    get username() {
        return this.formPasswordReset.get('username');
    }
}
