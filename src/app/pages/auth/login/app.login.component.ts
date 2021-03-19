import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {Subscription} from 'rxjs';
import {ConfirmationService, Message} from 'primeng/api';
import {environment} from '../../../../environments/environment';
import {AuthService} from '../../../services/auth/auth.service';
import {Permission, Role, System, User} from '../../../models/auth/models.index';
import {Institution} from '../../../models/app/institution';


@Component({
    selector: 'app-login',
    templateUrl: './app.login.component.html',
    styleUrls: ['./login.component.scss'],
    styles: [`
        :host ::ng-deep .p-password input {
            width: 15rem
        }
    `]
})
export class AppLoginComponent implements OnInit, OnDestroy {
    dark: boolean;
    checked: boolean;
    msgs: Message[];
    user: User;
    system: System;
    formLogin: FormGroup;
    formPasswordReset: FormGroup;
    formInstitutionRole: FormGroup;
    formChangePassword: FormGroup;
    roles: Role[];
    institutions: Institution[];
    permissions: Permission[];
    flagShowPassword: boolean;
    flagShowPasswordReset: boolean;
    STORAGE_URL: string = environment.STORAGE_URL;
    flagChangePassword: boolean;

    private subscription: Subscription;

    constructor(private _authService: AuthService,
                private _spinner: NgxSpinnerService,
                private _router: Router,
                private _fb: FormBuilder,
                private _confirmationService: ConfirmationService) {
        this.subscription = new Subscription();
        this.roles = [];
        this.institutions = [];
        this.user = {};
        this.system = JSON.parse(localStorage.getItem('system'));
        this.verifySession();
    }

    ngOnInit(): void {
        this.buildFormLogin();
        this.buildFormInstitutionRole();
        this.buildFormChangePassword();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    buildFormLogin() {
        this.formLogin = this._fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            keep_session: [false],
        });
    }

    buildFormChangePassword() {
        this.formChangePassword = this._fb.group({
            new_password: ['', [Validators.required, Validators.minLength(6)]],
            password_confirmation: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    checkPasswords() {
        return this.formChangePassword.controls['new_password'].value === this.formChangePassword.controls['password_confirmation'].value;
    }

    buildFormInstitutionRole() {
        this.formInstitutionRole = this._fb.group({
            institution: ['', Validators.required],
            role: ['', Validators.required],
        });
    }

    onLoggedin() {
        this.msgs = [];
        const credentials = {
            username: this.formLogin.controls['username'].value,
            password: this.formLogin.controls['password'].value
        };
        this._spinner.show();
        this.subscription.add(this._authService.login(credentials).subscribe(
            response => {
                localStorage.setItem('token', JSON.stringify(response));
                this._authService.resetAttempts(credentials.username).subscribe(response => {
                    this.getUser();
                }, error => {
                    this._spinner.hide();
                    this.msgs = [{
                        severity: 'error',
                        summary: error.error.msg.summary,
                        detail: error.error.msg.detail,
                    }];
                });

            }, error => {
                this._spinner.hide();
                this._authService.removeLogin();
                if (error.status === 401) {
                    this._authService.attempts(credentials.username).subscribe(response => {
                        this.msgs = [{
                            severity: 'error',
                            summary: response['msg']['summary'],
                            detail: response['msg']['detail']
                        }];
                    }, error => {
                        this.msgs = [{
                            severity: 'error',
                            summary: error.error.msg.summary,
                            detail: error.error.msg.detail,
                        }];
                    });
                    return;
                }
                this.msgs = [{
                    severity: 'error',
                    summary: error.error.msg.summary,
                    detail: error.error.msg.detail,
                }];
            }));
    }

    getUser() {
        this.subscription.add(this._authService.getUser(this.formLogin.controls['username'].value).subscribe(
            response => {
                this._spinner.hide();
                let errors = false;
                this.user = response['data'];
                const roles = this.user['roles'];
                this.institutions = this.user['institutions'];
                this.msgs = [];
                // Error cuando no tiene asiganda una institucion
                if (this.institutions.length === 0) {
                    this.msgs.push({
                        severity: 'warn',
                        summary: 'No tiene una institucion asignada!',
                        detail: 'Comuníquese con el administrador!'
                    });
                    errors = true;
                }

                if (roles.length === 0) {
                    errors = true;
                }

                if (errors) {
                    return;
                }
                this.flagChangePassword = !this.user['change_password'];

                if (this.institutions.length === 1) {
                    this.formInstitutionRole.controls['institution'].setValue(this.institutions[0]);
                }

                if (this.institutions.length === 1 && roles.length === 1 && !this.flagChangePassword) {
                    this.formInstitutionRole.controls['role'].setValue(roles[0]);
                    this.getPermissions();
                }
            },
            error => {
                this._spinner.hide();
                this.msgs = [{
                    severity: 'error',
                    summary: error.error.msg.summary,
                    detail: error.error.msg.detail
                }];
            }));
    }

    changePassword() {
        this.msgs = [];
        if (this.checkPasswords()) {
            this.user.password = this.formLogin.controls['password'].value;
            this.user.new_password = this.formChangePassword.controls['new_password'].value;
            this.user.password_confirmation = this.formChangePassword.controls['password_confirmation'].value;
            this._spinner.show();
            this._authService.changePassword('auth/change_password', {user: this.user}).subscribe(
                response => {
                    this._spinner.hide();
                    this.flagChangePassword = false;
                },
                error => {
                    this._spinner.hide();
                    this.msgs = [{
                        severity: 'error',
                        summary: error.error.msg.summary,
                        detail: error.error.msg.detail
                    }];
                });
        }
    }

    onSubmitLogin(event: Event) {
        event.preventDefault();
        if (this.formLogin.valid) {
            this.onLoggedin();
        } else {
            this.formLogin.markAllAsTouched();
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

    onSubmitContinue(event: Event) {
        event.preventDefault();
        if (this.formInstitutionRole.valid) {
            this.continueLogin();
        } else {
            this.formInstitutionRole.markAllAsTouched();
        }
    }

    continueLogin() {
        localStorage.setItem('user', JSON.stringify(this.user));
        localStorage.setItem('isLoggedin', 'true');
        localStorage.setItem('institution', JSON.stringify(this.formInstitutionRole.controls['institution'].value));
        localStorage.setItem('role', JSON.stringify(this.formInstitutionRole.controls['role'].value));
        this.keepSession();
        this._router.navigate(['/dashboard']);
    }

    resetFormInstitutionRole() {
        this.roles = [];
        this.institutions = [];
        this.msgs = [];
        this.buildFormInstitutionRole();
    }

    getRoles() {
        this.subscription.add(this._authService.post('users/roles', {
            institution: this.formInstitutionRole.controls['institution'].value['id'],
            user: this.user.id
        }).subscribe(response => {
            this.roles = response['data'];
            if (!this.roles || this.roles.length === 0) {
                this.msgs = [{
                    severity: 'warn',
                    summary: 'No tiene un rol asignado para esta Institución!',
                    detail: 'Comuníquese con el administrador!'
                }];
            } else {
                this.msgs = [];
            }
        }, error => {
            this.roles = [];
            this.msgs = [{
                severity: 'warn',
                summary: 'No tiene un rol asignado para esta Institución!',
                detail: 'Comuníquese con el administrador!'
            }];
        }));
    }

    getPermissions() {
        this._spinner.show();
        this.subscription.add(this._authService.post('users/permissions', {
            role: this.formInstitutionRole.controls['role'].value['id'],
            institution: this.formInstitutionRole.controls['institution'].value['id']
        }).subscribe(response => {
            this._spinner.hide();
            const permissions = response['data'];
            localStorage.setItem('system', JSON.stringify(this.roles.find(element =>
                element.id == this.formInstitutionRole.controls['role'].value['id']
            ).system))

            if (!permissions) {
                this.msgs = [{
                    severity: 'warn',
                    summary: 'No tiene permisos asignados!',
                    detail: 'Comuníquese con el administrador!'
                }];
            } else {
                this.msgs = [];
                localStorage.setItem('permissions', JSON.stringify(permissions));
                this.continueLogin();
            }
        }, error => {
            this._spinner.hide();
        }));
    }

    keepSession() {
        localStorage.setItem('keepSession', JSON.stringify(this.formLogin.controls['keep_session'].value));
    }

    verifySession() {
        if (localStorage.getItem('keepSession') == 'true') {
            this._router.navigate(['/dashboard']);
        }
    }

    usernameField(){
        return this.formLogin.get('username');
    }

    passwordField(){
        return this.formLogin.get('password');
    }

    keepSessionField(){
        return this.formLogin.get('keep_session');
    }

    newPasswordField(){
        return this.formChangePassword.get('new_password');
    }

    passwordConfirmationField(){
        return this.formChangePassword.get('password_confirmation');
    }

    institutionField(){
        return this.formInstitutionRole.get('institution');
    }

    roleField(){
        return this.formInstitutionRole.get('role');
    }
}
