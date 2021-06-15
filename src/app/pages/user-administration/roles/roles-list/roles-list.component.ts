import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Col} from '../../../../models/setting/col';
import { User } from '../../../../models/auth/user';
import { FormGroup } from '@angular/forms';
import { Paginator } from '../../../../models/setting/paginator';
import {MessageService} from '../../../shared/services/message.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {UserAdministrationService } from '../../../../services/auth/user-administration.service';
import {HttpParams} from '@angular/common/http';
import { Role } from 'src/app/models/auth/role';
import { Permission } from 'src/app/models/auth/permission';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss']
})
export class RolesListComponent implements OnInit {

  @Input() flagRoles: boolean;
  @Input() rolesIn: Role[];
  @Input() permissionsIn: Permission[];
  @Input() paginatorRoleIn: Paginator;
  @Input() displayIn: boolean;
  @Input() formRoleIn: FormGroup;
  @Output() rolesOut = new EventEmitter<User[]>();
  @Output() formRoleOut = new EventEmitter<FormGroup>();
  @Output() displayRoleEditOut = new EventEmitter<boolean>();
  @Output() paginatorRoleOut = new EventEmitter<Paginator>();



  selectedRoles: any[];
  selectedRole: Role;
  permissionsRole: Role[];
  colsRole: Col[];
  dialogViewPermissions: boolean;
  paginatorRoles: Paginator;
  roleName: String;
  roleId: String;

  constructor(private messageService: MessageService,
    private spinnerService: NgxSpinnerService,
    private userAdministrationService: UserAdministrationService) {
      this.resetPaginatorRoles();
  }

  ngOnInit(): void {
    this.loadColsRole();
  }

  loadColsRole() {
    this.colsRole = [
        {field: 'name', header: 'Nombre'},
        {field: 'code', header: 'Código'},
      ];
  }

  paginateRole(event) {
    this.paginatorRoleIn.current_page = event.page + 1;
    this.paginatorRoleOut.emit(this.paginatorRoleIn);
    
  }

  resetPaginatorRoles() {
   this.paginatorRoleIn = {current_page: 1, per_page: 5};
  }
  
  searchRoles(event, search) {
    if (event.type === 'click' || event.keyCode === 13 || search.length === 0) {
        const params = search.length > 0 ? new HttpParams().append('search', search) : null;
        this.spinnerService.show();
        this.userAdministrationService.get('user-admin/rolesP', params).subscribe(response => {
            this.rolesIn = response['data'],
                this.spinnerService.hide();
        }, error => {
            this.spinnerService.hide();
            this.messageService.error(error);
          });
      }
  }

  sendUsers() {
    this.rolesOut.emit(this.rolesIn);
  }

  openNewUserForm() {
    
  }

  openEditFormRole(role: Role) {
    this.formRoleIn.patchValue(role);
    this.formRoleOut.emit(this.formRoleIn);
    this.displayRoleEditOut.emit(true);
  }

  deleteRoles(user = null) {
    this.messageService.questionDelete({})
    .then((result) => {
      if (result.isConfirmed) {
        if (user) {
           this.selectedRoles = [];
           this.selectedRoles.push(user);
        }
        const ids = this.selectedRoles.map(element => element.id);
        this.spinnerService.show();
        this.userAdministrationService.delete('user-admin/deleteRoles', ids)
        .subscribe(response => {
          this.spinnerService.hide();
          this.messageService.success(response);
            this.removeRoles(ids);
            this.selectedRoles = [];
        }, error => {
          this.spinnerService.hide();
          this.messageService.error(error);
        });
      }
    });
  }

  removeRoles(ids) {
    for (const id of ids) {
        this.rolesIn = this.rolesIn.filter(element => element.id !== id);
    }
    this.rolesOut.emit(this.rolesIn);
  }

  selectRole(role: Role) {
    this.selectedRole = role;
  }

  openViewPermissions() {
    this.getPermissions();
  }

  getPermissions() {
    let params = new HttpParams().append('id', this.selectedRole.id.toString());
    this.roleName = this.selectedRole.name;
    this.roleId = this.selectedRole.id.toString();
    this.spinnerService.show();
    this.userAdministrationService.get('user-admin/permissionsRole', params).subscribe(response => {
        this.spinnerService.hide();
        this.permissionsRole = response['data'];
        this.paginatorRoles = response as Paginator;
        this.dialogViewPermissions = true;
    }, error => {
        this.spinnerService.hide();
        this.permissionsRole = [];
        this.dialogViewPermissions = true;
        this.messageService.error(error);
    });
  }
}
