import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Role, User} from '../../../models/auth/models.index';
import {Condition} from '../../../models/setting/condition';
import {MessageService} from 'primeng/api';
import {AuthHttpService} from "../../../services/auth/authHttp.service";

@Component({
    selector: 'app-assign-permission-role',
    templateUrl: './assign-permission-role.component.html',
    styleUrls: ['./assign-permission-role.component.scss']
})
export class AssignPermissionRoleComponent implements OnInit {
    roles: Role[];
    users: User[];
    conditions: Condition[];
    selectedUser: User;
    selectedRole: Role;
    filteredUsers: User[];

    constructor(private authHttpService: AuthHttpService,
                private authService: AuthService,
                private spinnerService: NgxSpinnerService,
                private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.getRoles();
        this.getUsers();
    }

    getRoles() {
        this.spinnerService.show();
        this.authHttpService.get('roles').subscribe(response => {
            this.spinnerService.hide();
            this.roles = response['data'];
            console.log(this.roles);
        }, error => {
            this.spinnerService.hide();
        });
    }

    getUsers() {
        this.spinnerService.show();
        this.authHttpService.post('roles/users', {conditions: this.conditions}).subscribe(response => {
            this.spinnerService.hide();
            this.users = response['data'];
            console.log(this.users);
        }, error => {
            this.spinnerService.hide();
        });
    }

    assignRole() {
        this.spinnerService.show();
        this.authHttpService.post('roles/assign_role', {
            user_id: this.selectedUser.id,
            role_id: this.selectedRole.id
        }).subscribe(response => {
            this.spinnerService.hide();
            const indexRole = this.roles.indexOf(this.selectedRole);
            if (!this.roles[indexRole]['users'].find(element => element.id === this.selectedUser.id)) {
                this.roles[indexRole]['users'].push(this.selectedUser);
            } else {
                this.messageService.add({
                    key: 'msgToast',
                    severity: 'warn',
                    summary: 'El usuario ya tiene asignado el rol',
                    detail: 'Intente con otro usuario'
                });
            }
        }, error => {
            this.spinnerService.hide();
        });
    }

    removeRole(user) {
        this.spinnerService.show();
        this.authHttpService.post('roles/remove_role', {
            user_id: user.id,
            role_id: this.selectedRole.id
        }).subscribe(response => {
            this.spinnerService.hide();
            const indexRole = this.roles.indexOf(this.selectedRole);
            this.roles[indexRole]['users'] = this.roles[indexRole]['users'].filter(element => element.id !== user.id);

        }, error => {
            this.spinnerService.hide();
        });
    }

    filterUser(event) {
        const filtered: User[] = [];
        const query = event.query;
        for (let i = 0; i < this.users.length; i++) {
            const user = this.users[i];
            if (
                user.username.toLowerCase().indexOf(query.toLowerCase()) === 0
                || user.first_lastname.toLowerCase().indexOf(query.toLowerCase()) === 0
                || user.second_lastname.toLowerCase().indexOf(query.toLowerCase()) === 0
                || user.first_name.toLowerCase().indexOf(query.toLowerCase()) === 0
                || user.second_name.toLowerCase().indexOf(query.toLowerCase()) === 0
            ) {
                filtered.push(user);
            }
        }

        this.filteredUsers = filtered;
    }
}
