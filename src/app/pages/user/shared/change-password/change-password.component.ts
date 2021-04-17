import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../../../shared/validators/custom-validators";

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
    formChangePasspword: FormGroup;

    constructor(private _formBuilder: FormBuilder,) {
    }

    ngOnInit(): void {
        this.buildFormChangePassword();
    }

    buildFormChangePassword() {
        this.formChangePasspword = this._formBuilder.group({
                password_old: ['', Validators.required],
                password: ['',
                    [
                        Validators.required,
                        CustomValidators.hasNumber,
                        CustomValidators.hasLowerCase,
                        CustomValidators.hasUpperCase,
                        Validators.minLength(8)
                    ]
                ],
                password_confirmation: ['', Validators.required]
            },
            {
                // check whether our password and confirm password match
                validator: CustomValidators.passwordMatchValidator
            }
        )
    }

    passwordField() {
        return this.formChangePasspword.get('password');
    }

    passwordConfirmationField() {
        return this.formChangePasspword.get('password_confirmation');
    }

    passwordOldField() {
        return this.formChangePasspword.get('password_old');
    }

    changePassword() {

    }
}
