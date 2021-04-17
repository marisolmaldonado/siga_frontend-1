import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Role} from '../../../../models/auth/role';
import {Institution} from '../../../../models/app/institution';
import {Permission} from '../../../../models/auth/permission';
import {NgxSpinnerService} from 'ngx-spinner';
import {AuthService} from '../../../../services/auth/auth.service';
import {Message} from 'primeng/api';
import {User} from '../../../../models/auth/user';

@Component({
    selector: 'app-select-institution-role',
    templateUrl: './select-institution-role.component.html',
    styleUrls: ['./select-institution-role.component.css']
})
export class SelectInstitutionRoleComponent implements OnInit {
    formInstitutionRole: FormGroup;
    roles: Role[];
    institutions: Institution[];
    permissions: Permission[];
    msgs: Message[];
    auth: User;
    private subscription: Subscription;

    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private spinner: NgxSpinnerService,
                private authService: AuthService) {
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
        this.subscription.add(this.authService.post('users/roles', {
            institution: this.institutionField.value['id'],
            user: this.auth.id
        }).subscribe(response => {
            this.roles = response['data'];
            if (this.roles?.length === 0) {
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
        this.spinner.show();
        this.subscription.add(this.authService.post('users/permissions', {
            role: this.roleField.value['id'],
            institution: this.institutionField.value['id']
        }).subscribe(response => {
            this.spinner.hide();
            const permissions = response['data'];

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
            this.spinner.hide();
        }));
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
