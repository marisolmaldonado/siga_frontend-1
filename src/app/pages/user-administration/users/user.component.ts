import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAdministrationService } from '../../../services/auth/user-administration.service';
import { User } from '../../../models/auth/user';
import { Paginator } from '../../../models/setting/paginator';
import { HttpParams } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { BreadcrumbService } from '../../../shared/services/breadcrumb.service';
import { MessageService } from '../../shared/services/message.service';
import { Role } from 'src/app/models/auth/role';
import { Permission } from 'src/app/models/auth/permission';

@Component({
    selector: 'app-users',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {

    paginatorUser: Paginator;
    paginatorRole: Paginator;
    users: User[];
    roles: Role[];
    permissions: Permission[];
    rolesP: Role[];
    formUser: FormGroup;
    formRole: FormGroup;
    user: User;
    role: User;
    userDialog: boolean;
    userEditDialog: boolean;
    roleEditDialog: boolean;
    flagUsers: boolean;
    flagRoles: boolean;

    constructor(
        private messageService: MessageService,
        private formBuilder: FormBuilder,
        private userAdministrationService: UserAdministrationService,
        private breadcrumbService: BreadcrumbService) {

        this.breadcrumbService.setItems([
            { label: 'Dashboard', routerLink: ['/dashboard'] },
            { label: 'user administration' }
        ]);
        this.paginatorUser = { current_page: 1, per_page: 5 };
        this.paginatorRole = { current_page: 1, per_page: 5 };
        this.users = [];
        this.roles = [];
        this.permissions = [];
    }

    ngOnInit(): void {
        this.getUsers(this.paginatorUser);
        this.getRolesP(this.paginatorRole);
        this.getRoles();
        this.getPermissions();
        this.buildFormUser();
        this.buildFormRole();
    }

    buildFormUser() {
        this.formUser = this.formBuilder.group({
            id: [null],
            identification: [null, [Validators.required]],
            names: [null, [Validators.required]],
            first_lastname: [null, [Validators.required]],
            second_lastname: [null, [Validators.required]],
            email: [null, [Validators.email, Validators.required]],
            roles: [null, [Validators.required]],
        });
    }

    buildFormRole() {
        this.formRole = this.formBuilder.group({
            id: [null],
            name: [null, [Validators.required]],
            code: [null, [Validators.required]],
        });
    }

    getUsers(paginator: Paginator) {
        const params = new HttpParams()
            .append('page', paginator.current_page.toString())
            .append('per_page', paginator.per_page.toString());

        this.flagUsers = true;
        this.userAdministrationService.get('user-admins', params).subscribe(
            response => {
                this.flagUsers = false;
                this.users = response['data'];
                this.paginatorUser = response as Paginator;
            }, error => {
                this.flagUsers = false;
                this.messageService.error(error);
            });
    }

    getRolesP(paginator: Paginator) {
        const params = new HttpParams()
            .append('page', paginator.current_page.toString())
            .append('per_page', paginator.per_page.toString());

        this.flagRoles = true;
        this.userAdministrationService.get('user-admin/rolesP', params).subscribe(
            response => {
                this.flagRoles = false;
                this.rolesP = response['data'];
                this.paginatorRole = response as Paginator;
            }, error => {
                this.flagRoles = false;
                this.messageService.error(error);
            });
    }

    getRoles() {
        const params = new HttpParams()
        this.userAdministrationService.get('user-admin/roles', params).subscribe(
            response => {
                this.roles = response['data'];
            }, error => {
                this.messageService.error(error);
            });
    }
    
    getPermissions() {
        const params = new HttpParams()
        this.userAdministrationService.get('user-admin/permissions', params).subscribe(
            response => {
                this.permissions = response['data'];
            }, error => {
                this.messageService.error(error);
            });
      } 
}
