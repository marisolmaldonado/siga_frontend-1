import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {HttpParams} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {MessageService} from '../../../shared/services/message.service';
import {User, Role} from '../../../../models/auth/models.index';
import {Institution} from '../../../../models/app/institution';
import {AuthHttpService} from '../../../../services/auth/auth-http.service';
import {AuthService} from '../../../../services/auth/auth.service';

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
    auth: User;
    STORAGE_URL: string = environment.STORAGE_URL;

    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private authHttpService: AuthHttpService,
                private spinnerService: NgxSpinnerService,
                public messageService: MessageService,
                private authService: AuthService
    ) {
        this.auth = authService.auth;
        this.institutions = authService.institutions;
    }

    ngOnInit(): void {
        this.buildFormInstitutionRole();
    }

    buildFormInstitutionRole() {
        this.formInstitutionRole = this.formBuilder.group({
            institution: [null, Validators.required],
            role: [null, Validators.required],
        });
    }

    onSubmitContinue() {
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

        this.authHttpService.get('auth/roles', params).subscribe(response => {
            this.spinnerService.hide();
            this.roles = response['data'];
        }, error => {
            this.spinnerService.hide();
            this.messageService.error(error);
            this.roles = [];
        });
    }

    getPermissions() {
        const params = new HttpParams()
            .append('role', this.roleField.value['id'])
            .append('institution', this.institutionField.value['id']);
        this.spinnerService.show();
        this.authHttpService.get('auth/permissions', params).subscribe(response => {
            this.spinnerService.hide();
            const permissions = response['data'];
            this.authService.setPermissions(permissions);
            this.continueLogin();
        }, error => {
            this.spinnerService.hide();
            this.messageService.success(error);
        });
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
}
