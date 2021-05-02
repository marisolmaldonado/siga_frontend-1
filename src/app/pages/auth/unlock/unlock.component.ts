import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth/auth.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {User} from '../../../models/auth/user';

@Component({
    selector: 'app-password-reset',
    templateUrl: './unlock.component.html',
    styleUrls: ['./unlock.component.scss']
})
export class UnlockComponent implements OnInit {
    dark: boolean;
    checked: boolean;
    user: User;
    formPasswordReset: FormGroup;

    constructor(private authService: AuthService,
                private spinner: NgxSpinnerService,
                private router: Router,
                private formBuilder: FormBuilder,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.buildFormPasswordReset();
    }

    buildFormPasswordReset() {
        this.formPasswordReset = this.formBuilder.group({
            token: [this.activatedRoute.snapshot.queryParams.token, Validators.required],
            username: [this.activatedRoute.snapshot.queryParams.username, Validators.required],
            password: ['', [Validators.required, Validators.minLength(8)]],
            password_confirmation: ['', [Validators.required, Validators.minLength(8)]],
        });
    }

    onSubmitResetPassword(event: Event) {
        event.preventDefault();
        if (this.formPasswordReset.valid) {
            this.resetPassword();
        } else {
            this.formPasswordReset.markAllAsTouched();
        }
    }

    resetPassword() {
        if (this.checkPasswords()) {
            this.spinner.show();
            this.authService.unlock(this.formPasswordReset.value).subscribe(
                response => {
                    this.spinner.hide();
                    swal.fire({
                        title: response['msg']['summary'],
                        text: response['msg']['detail'],
                        icon: 'info'
                    });
                }, error => {
                    this.spinner.hide();
                    swal.fire({
                        title: error.error.msg.summary,
                        text: error.error.msg.detail,
                        icon: 'error'
                    });
                });
        }
    }

    checkPasswords() {
        return this.passwordField.value === this.passwordConfirmationField.value;
    }

    get usernameField() {
        return this.formPasswordReset.get('username');
    }

    get passwordField() {
        return this.formPasswordReset.get('password');
    }

    get passwordConfirmationField() {
        return this.formPasswordReset.get('password_confirmation');
    }
}
