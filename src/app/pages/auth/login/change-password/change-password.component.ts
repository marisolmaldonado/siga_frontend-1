import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Message} from 'primeng/api';
import {User} from '../../../../models/auth/user';
import {NgxSpinnerService} from 'ngx-spinner';
import {AuthService} from '../../../../services/auth/auth.service';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
    flagChangePassword: boolean;
    flagShowPassword: boolean;
    formChangePassword: FormGroup;
    msg: Message[];

    constructor(private formBuilder: FormBuilder, private spinner: NgxSpinnerService, private authService: AuthService) {
    }

    ngOnInit(): void {
        this.buildFormChangePassword();
    }

    buildFormChangePassword() {
        this.formChangePassword = this.formBuilder.group({
            password_old: ['', [Validators.required, Validators.minLength(8)]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            password_confirmation: ['', [Validators.required, Validators.minLength(8)]],
        });
    }

    changePassword() {
        this.msg = [];
        if (this.checkPasswords()) {
            this.spinner.show();
            this.authService.changePassword( this.formChangePassword.value).subscribe(
                response => {
                    this.spinner.hide();
                    this.flagChangePassword = false;
                },
                error => {
                    this.spinner.hide();
                    this.msg = [{
                        severity: 'error',
                        summary: error.error.msg.summary,
                        detail: error.error.msg.detail
                    }];
                });
        }
    }

    onSubmitChangePassword(event: Event) {
        event.preventDefault();
        if (this.formChangePassword.valid) {
            this.changePassword();
        } else {
            this.formChangePassword.markAllAsTouched();
        }
    }

    checkPasswords() {
        return this.passwordField.value === this.passwordConfirmationField.value;
    }

    get passwordField(){
        return this.formChangePassword.get('password');
    }

    get passwordConfirmationField() {
        return this.formChangePassword.get('password_confirmation');
    }
}
