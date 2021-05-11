import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Role} from '../../../../models/auth/role';
import {Institution} from '../../../../models/app/institution';
import {Permission} from '../../../../models/auth/permission';
import {NgxSpinnerService} from 'ngx-spinner';
import {AuthService} from '../../../../services/auth/auth.service';
import {User} from '../../../../models/auth/user';
import {HttpParams} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {AuthHttpService} from '../../../../services/auth/auth-http.service';
import {MessageService} from '../../../../services/app/message.service';

@Component({
    selector: 'app-select-institution-role',
    templateUrl: './select-institution-role.component.html',
    styleUrls: ['./select-institution-role.component.css']
})
export class SelectInstitutionRoleComponent implements OnInit {
    @Output() flagLogin = new EventEmitter<string>();
    formInstitutionRole: FormGroup;
    roles: Role[];
    institutions: Institution[];
    permissions: Permission[];
    auth: User;
    STORAGE_URL: string = environment.STORAGE_URL;
    private subscription: Subscription;

    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private authHttpService: AuthHttpService,
                private spinnerService: NgxSpinnerService,
                private messageService: MessageService,
                private authService: AuthService
    ) {
        this.subscription = new Subscription();
        this.auth = authService.auth;
        this.institutions = authService.institutions;
    }

    ngOnInit(): void {
        this.buildFormInstitutionRole();
    }

    buildFormInstitutionRole() {
        this.formInstitutionRole = this.formBuilder.group({
            institution: ['', Validators.required],
            role: [''],
        });
        console.log(this.institutionField);
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
        this.authService.setAuth(this.authService.auth);
        this.authService.setInstitution(this.institutionField.value);
        this.authService.setRole(this.roleField.value);
        this.router.navigate(['/']);
    }

    getRoles() {
        const params = new HttpParams().append('institution', this.institutionField.value['id']);
        this.spinnerService.show();
        this.subscription.add(
            this.authHttpService.get('auth/roles', params).subscribe(response => {
                this.spinnerService.hide();
                this.roles = response['data'];
                if (this.roles?.length === 0) {
                    this.messageService.success(response);
                }
            }, error => {
                this.spinnerService.hide();
                this.roles = [];
                this.messageService.error(error);
            }));
    }

    getPermissions() {
        const params = new HttpParams()
            .append('role', this.roleField.value['id'])
            .append('institution', this.institutionField.value['id']);
        this.spinnerService.show();
        this.subscription.add(
            this.authHttpService.get('auth/permissions', params).subscribe(response => {
                this.spinnerService.hide();
                const permissions = response['data'];

                if (!permissions) {
                    this.messageService.success(response);
                } else {
                    localStorage.setItem('permissions', JSON.stringify(permissions));
                    this.continueLogin();
                }
            }, error => {
                this.spinnerService.hide();
            }));
    }

    returnLogin() {
        this.flagLogin.emit('login');
    }

    get institutionField() {
        return this.formInstitutionRole.get('institution');
    }

    get roleField() {
        return this.formInstitutionRole.get('role');
    }

    get institutionDenominationField() {
        return this.institutionField.value['denomination'];
    }
}
