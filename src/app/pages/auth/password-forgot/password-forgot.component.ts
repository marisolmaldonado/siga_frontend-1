import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../../environments/environment';
import swal from 'sweetalert2';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
    selector: 'app-password-forgot',
    templateUrl: './password-forgot.component.html',
    styleUrls: ['./password-forgot.component.scss']
})
export class PasswordForgotComponent implements OnInit {
    dark: boolean;
    checked: boolean;
    formPasswordReset: FormGroup;
    flagPasswordReset: boolean;
    SITE_KEY: string;

    constructor(private authService: AuthService,
                private spinner: NgxSpinnerService,
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
        this.spinner.show();
        this.authService.passwordForgot(this.formPasswordReset.controls['username'].value).subscribe(response => {
            this.spinner.hide();
            this.flagPasswordReset = false;
            grecaptcha.reset();
            swal.fire({
                title: response['msg']['summary'],
                text: response['msg']['detail'],
                icon: 'info'
            });
        }, error => {
            this.spinner.hide();
            this.flagPasswordReset = false;
            grecaptcha.reset();
            swal.fire({
                title: error.error.msg.summary,
                text: error.error.msg.detail,
                icon: 'error'
            });
        });
    }

    showResponse() {
        this.flagPasswordReset = true;
    }

    get username() {
        return this.formPasswordReset.get('username');
    }
}
