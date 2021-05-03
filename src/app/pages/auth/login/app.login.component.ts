import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../services/auth/auth.service';
import {Role, System, User} from '../../../models/auth/models.index';
import {Institution} from '../../../models/app/institution';
import swal from 'sweetalert2';
import {environment} from '../../../../environments/environment';
import {MessageService} from '../../../services/app/message.service';

@Component({
    selector: 'app-login',
    templateUrl: './app.login.component.html',
    styleUrls: ['./login.component.scss']
})
export class AppLoginComponent implements OnInit, OnDestroy {
    dark: boolean;
    checked: boolean;
    auth: User;
    system: System;
    formLogin: FormGroup;
    roles: Role[];
    institutions: Institution[];
    flagLogin: string;

    private subscription: Subscription;

    constructor(private authService: AuthService,
                private messageService: MessageService,
                private spinner: NgxSpinnerService,
                private router: Router,
                private formBuilder: FormBuilder) {
        this.subscription = new Subscription();
        this.flagLogin = 'login';
        this.roles = [];
        this.institutions = [];
        this.auth = {};
        this.verifySession();
    }

    ngOnInit(): void {
        this.buildFormLogin();
        this.getSystem();
    }

    getSystem() {
        this.authService.get('systems/' + environment.SYSTEM_ID).subscribe(response => {
            this.system = response['data'];
        });
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
                        this.messageService.error(error);
                    });
                }, error => {
                    this.spinner.hide();
                    this.authService.removeLogin();
                    if (error.status === 401) {
                        this.authService.validateAttempts(this.usernameField.value).subscribe(response => {
                        }, error => {
                            this.messageService.error(error);
                        });
                        return;
                    }
                    this.messageService.error(error);
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

                        // Error cuando no tiene asiganda una institucion
                        if (this.institutions?.length === 0) {
                            swal.fire({
                                title: 'No tiene una institucion asignada!',
                                text: 'Comuníquese con el administrador!',
                                icon: 'warning'
                            });
                            return;
                        }
                        this.flagLogin = this.auth['is_changed_password'] ? 'selectInstitutionRole' : 'changePassword';
                    },
                    error => {
                        this.spinner.hide();
                        swal.fire({
                            title: error.error.msg.summary,
                            text: error.error.msg.detail,
                            icon: 'error'
                        });
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
