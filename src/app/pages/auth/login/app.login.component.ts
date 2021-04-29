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
    styleUrls: ['./login.component.scss']
})
export class AppLoginComponent implements OnInit, OnDestroy {
    dark: boolean;
    checked: boolean;
    msgs: Message[];
    auth: User;
    system: System;
    formLogin: FormGroup;
    roles: Role[];
    institutions: Institution[];
    flagLogin: string;

    private subscription: Subscription;

    constructor(private authService: AuthService,
                private spinner: NgxSpinnerService,
                private router: Router,
                private formBuilder: FormBuilder) {
        this.subscription = new Subscription();
        this.flagLogin = 'login';
        this.roles = [];
        this.institutions = [];
        this.auth = {};
        this.system = authService.getSystem();
        this.verifySession();
    }

    ngOnInit(): void {
        this.buildFormLogin();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    buildFormLogin() {
        this.formLogin = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            keep_session: [false],
        });
    }

    login() {
        this.msgs = [];
        this.spinner.show();
        this.subscription.add(
            this.authService.login(this.formLogin.value).subscribe(
                response => {
                    this.authService.setToken(response);
                    this.authService.setKeepSession(this.keepSessionField.value);
                    this.authService.resetAttempts().subscribe(response => {
                        this.getUser();
                    }, error => {
                        this.spinner.hide();
                        this.msgs = [{
                            severity: 'error',
                            summary: error.error.msg.summary,
                            detail: error.error.msg.detail,
                        }];
                    });
                }, error => {
                    this.spinner.hide();
                    this.authService.removeLogin();
                    if (error.status === 401) {
                        this.authService.validateAttempts(this.usernameField.value).subscribe(response => {
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
        this.subscription.add(
            this.authService.getUser(this.formLogin.controls['username'].value)
                .subscribe(
                    response => {
                        this.spinner.hide();
                        this.auth = response['data'];
                        this.authService.auth = response['data'];
                        this.institutions = response['data']['institutions'];
                        this.authService.institutions = response['data']['institutions'];
                        this.msgs = [];

                        // Error cuando no tiene asiganda una institucion
                        if (this.institutions?.length === 0) {
                            this.msgs.push({
                                severity: 'warn',
                                summary: 'No tiene una institucion asignada!',
                                detail: 'Comuníquese con el administrador!'
                            });
                            return;
                        }
                        this.flagLogin = this.auth['is_changed_password'] ? 'selectInstitutionRole' : 'changePassword';
                    },
                    error => {
                        this.spinner.hide();
                        this.msgs = [{
                            severity: 'error',
                            summary: error.error.msg.summary,
                            detail: error.error.msg.detail
                        }];
                    }));
    }

    onSubmitLogin(event: Event) {
        event.preventDefault();
        if (this.formLogin.valid) {
            this.login();
        } else {
            this.formLogin.markAllAsTouched();
        }
    }

    verifySession() {
        if (localStorage.getItem('keepSession') === 'true') {
            this.router.navigate(['/dashboard']);
        }
    }

    get usernameField() {
        return this.formLogin.get('username');
    }

    get passwordField() {
        return this.formLogin.get('password');
    }

    get keepSessionField() {
        return this.formLogin.get('keep_session');
    }
}
