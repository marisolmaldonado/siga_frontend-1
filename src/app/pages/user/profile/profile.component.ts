import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DateValidators} from '../../shared/validators/date.validators'
import {UserValidators} from '../../shared/validators/user.validators'
import {User} from "../../../models/auth/user";
import {Catalogue} from "../../../models/app/catalogue";
import {AppService} from "../../../services/app/app.service";
import {HttpParams} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {BreadcrumbService} from "../../../shared/services/breadcrumb.service";
import {NgxSpinnerService} from "ngx-spinner";
import {MessageService} from 'primeng/api';
import {AuthService} from "../../../services/auth/auth.service";
import {Institution} from "../../../models/app/institution";
import {Role} from "../../../models/auth/role";


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    providers: [MessageService]
})
export class ProfileComponent implements OnInit {
    formProfile: FormGroup;
    dialog: boolean;
    catalogueIdentificationTypes: Catalogue[];
    catalogueSexs: Catalogue[];
    catalogueGenders: Catalogue[];
    catalogueEthnicOrigins: Catalogue[];
    catalogueBloodTypes: Catalogue[];
    catalogueCivilStatus: Catalogue[];
    auth: User;
    authInstitution: Institution;
    authRole: Role;
    STORAGE_URL: string;
    urlAvatar: string;
    uploadedFiles: any[];
    text: string;
    dialogRoles: boolean;
    dialogInstitutions: boolean;
    dialogAuth: boolean;
    dialogAuthPassword: boolean;

    constructor(private _formBuilder: FormBuilder,
                private _authService: AuthService,
                private _appService: AppService,
                private _breadcrumbService: BreadcrumbService,
                private _spinnerService: NgxSpinnerService,
                private _messageService: MessageService) {
        this._breadcrumbService.setItems([
            {label: 'Dashboard', routerLink: '/dashboard'},
            {label: 'Mi Perfil'},
        ]);
        this.auth = JSON.parse(localStorage.getItem('user'));
        this.authInstitution = JSON.parse(localStorage.getItem('institution'));
        this.authInstitution = JSON.parse(localStorage.getItem('institution'));
        this.authRole = JSON.parse(localStorage.getItem('role'));
        this.STORAGE_URL = environment.STORAGE_URL;
        this.uploadedFiles = [];
    }

    ngOnInit(): void {
        this.buildFormProfile();
        this.getCatalogueIdentificationTypes();
        this.getCatalogueSexs();
        this.getCatalogueGenders();
        this.getCatalogueEthnicOrigins();
        this.getCatalogueBloodTypes();
        this.getCatalogueCivilStatus();
        this.setProfile();
        this.getUrlAvatar();
    }

    buildFormProfile() {
        this.formProfile = this._formBuilder.group({
            id: [],
            username: [{value: null, disabled: true}],
            identification_type: ['', Validators.required],
            identification: [{value: null, disabled: true}, [
                Validators.required,
                Validators.minLength(UserValidators.identification().minlength),
                Validators.maxLength(UserValidators.identification().maxlength)]],
            first_name: ['', [
                Validators.required,
                Validators.minLength(UserValidators.firstName().minlength),
                Validators.maxLength(UserValidators.firstName().maxlength)]],
            second_name: ['', [
                Validators.required,
                Validators.minLength(UserValidators.secondName().minlength),
                Validators.maxLength(UserValidators.secondName().maxlength)]],
            first_lastname: ['', [
                Validators.required,
                Validators.minLength(UserValidators.firstLastname().minlength),
                Validators.maxLength(UserValidators.secondLastname().maxlength)]],
            second_lastname: ['', [
                Validators.required,
                Validators.minLength(UserValidators.secondLastname().minlength),
                Validators.maxLength(UserValidators.secondLastname().maxlength)]],
            email: ['', [
                Validators.required,
                Validators.email,
                Validators.maxLength(UserValidators.email().maxlength)]],
            personal_email: ['', [
                Validators.required,
                Validators.email,
                Validators.maxLength(UserValidators.email().maxlength)]],
            sex: ['', Validators.required],
            gender: ['', Validators.required],
            ethnic_origin: ['', Validators.required],
            location: ['', Validators.required],
            blood_type: ['', Validators.required],
            civil_status: ['', Validators.required],
            address: ['', Validators.required],
            phone: ['', Validators.required],
            birthdate: ['', [
                Validators.required,
                DateValidators.valid]],
            password: ['', Validators.required],
            password_old: ['', Validators.required],
            password_confirmation: ['', Validators.required],
            institutions: [''],
            roles: [''],
        })
    }

    getCatalogueIdentificationTypes() {
        const params = new HttpParams().append('type', 'IDENTIFICATION_TYPE');
        this._appService.getCatalogues(params).subscribe(response => {
            this.catalogueIdentificationTypes = response['data'];
        });
    }

    getCatalogueSexs() {
        const params = new HttpParams().append('type', 'SEX_TYPE');
        this._appService.getCatalogues(params).subscribe(response => {
            this.catalogueSexs = response['data'];
        });
    }

    getCatalogueGenders() {
        const params = new HttpParams().append('type', 'GENDER_TYPE');
        this._appService.getCatalogues(params).subscribe(response => {
            this.catalogueGenders = response['data'];
        });
    }

    getCatalogueEthnicOrigins() {
        const params = new HttpParams().append('type', 'ETHNIC_ORIGIN_TYPE');
        this._appService.getCatalogues(params).subscribe(response => {
            this.catalogueEthnicOrigins = response['data'];
        });
    }

    getCatalogueBloodTypes() {
        const params = new HttpParams().append('type', 'BLOOD_TYPE');
        this._appService.getCatalogues(params).subscribe(response => {
            this.catalogueBloodTypes = response['data'];
        });
    }

    getCatalogueCivilStatus() {
        const params = new HttpParams().append('type', 'CIVIL_STATUS');
        this._appService.getCatalogues(params).subscribe(response => {
            this.catalogueCivilStatus = response['data'];
        });
    }

    setProfile() {
        this.formProfile.patchValue(this.auth);
    }

    onSubmit(event: Event) {
        event.preventDefault();
        if (this.formProfile.valid) {
            this.updateProfile();
        } else {
            this.formProfile.markAllAsTouched();
        }
    }

    updateProfile() {
        console.log(this.formProfile.value);
        // this._authService.update('users/profile',{this.formProfile.value})
    }

    updateAuth() {
        if (this.emailField().valid && this.phoneField().valid) {

        }
    }

    onUploadAvatar(event, avatar) {
        const form = new FormData();
        form.append('file', event.files[0]);
        this._spinnerService.show();
        this._authService.uploadAvatar(form).subscribe(response => {
            this._spinnerService.hide();
            this.auth.avatar = response['data'];
            this._authService.setUrlAvatar(this.auth.avatar + '?rand=' + Math.random());
            avatar.src = this._authService.getUrlAvatar();
            localStorage.setItem('user', JSON.stringify(this.auth));
            avatar.clear();
            this._messageService.add({severity: 'success', summary: 'Archivo subido', detail: 'Correctamente'});
        }, error => {
            this._spinnerService.hide();
        });

    }

    getUrlAvatar() {
        if (this.auth) {
            if (this.auth.avatar) {
                this.urlAvatar = this.STORAGE_URL + this.auth.avatar;
            } else {
                if (this.auth.sex) {
                    if (this.auth.sex.code === 'MALE') {
                        this.urlAvatar = this.STORAGE_URL + 'avatars/male.png';
                    } else {
                        this.urlAvatar = this.STORAGE_URL + 'avatars/famale.png';
                    }
                } else {
                    this.urlAvatar = this.STORAGE_URL + 'avatars/anonymous.png';
                }
            }
        }
    }

    openModalAuth() {
        this.dialogAuth = true;
    }

    openModalRoles() {
        this.dialogRoles = true;
    }

    openModalInstitutions() {
        this.dialogInstitutions = true;
    }

    openModalAuthPassword() {
        this.dialogAuthPassword = true;
    }

    identificationTypeField() {
        return this.formProfile.get('identification_type');
    }

    firstLastnameField() {
        return this.formProfile.get('first_lastname');
    }

    secondLastnameField() {
        return this.formProfile.get('second_lastname');
    }

    firstNameField() {
        return this.formProfile.get('first_name');
    }

    secondNameField() {
        return this.formProfile.get('second_name');
    }

    phoneField() {
        return this.formProfile.get('phone');
    }

    emailField() {
        return this.formProfile.get('email');
    }

    personalEmailField() {
        return this.formProfile.get('personal_email');
    }

    birthdateField() {
        return this.formProfile.get('birthdate');
    }

    identificationField() {
        return this.formProfile.get('identification');
    }

    sexField() {
        return this.formProfile.get('sex');
    }

    bloodTypeField() {
        return this.formProfile.get('blood_type');
    }

    ethnicOriginField() {
        return this.formProfile.get('ethnic_origin');
    }

    genderField() {
        return this.formProfile.get('gender');
    }

    civilStatusField() {
        return this.formProfile.get('civil_status');
    }

    addressField() {
        return this.formProfile.get('address');
    }

    locationField() {
        return this.formProfile.get('location');
    }

    rolesField() {
        return this.formProfile.get('roles');
    }

    institutionsField() {
        return this.formProfile.get('institutions');
    }
}
