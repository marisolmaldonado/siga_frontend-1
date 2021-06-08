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

@Component({
    selector: 'app-users',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
    paginator: Paginator;
    users: User[];
    roles: Role[];
    formUser: FormGroup;
    user: User;
    userDialog: boolean;
    userEditDialog: boolean;
    flagUsers: boolean;

    constructor(
        private messageService: MessageService,
        private formBuilder: FormBuilder,
        private userAdministrationService: UserAdministrationService,
        private breadcrumbService: BreadcrumbService) {

        this.breadcrumbService.setItems([
            { label: 'Dashboard', routerLink: ['/dashboard'] },
            { label: 'user administration' }
        ]);
        this.paginator = { current_page: 1, per_page: 5 };
        this.users = [];
    }

    ngOnInit(): void {
        this.getUsers(this.paginator);
        this.getRoles();
        this.buildFormUser();
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

    getUsers(paginator: Paginator) {
        const params = new HttpParams()
            .append('page', paginator.current_page.toString())
            .append('per_page', paginator.per_page.toString());

        this.flagUsers = true;
        this.userAdministrationService.get('user-admins', params).subscribe(
            response => {
                this.flagUsers = false;
                this.users = response['data'];
                this.paginator = response as Paginator;
            }, error => {
                this.flagUsers = false;
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
      
}
