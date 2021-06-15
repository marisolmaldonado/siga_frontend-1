import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserAdministrationService } from '../../../../services/auth/user-administration.service';
import { FormGroup } from '@angular/forms';
import { MessageService } from '../../../shared/services/message.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Role } from 'src/app/models/auth/role';

@Component({
  selector: 'app-roles-edit-form',
  templateUrl: './roles-edit-form.component.html',
  styleUrls: ['./roles-edit-form.component.scss']
})
export class RolesEditFormComponent implements OnInit {

  @Input() formRoleIn: FormGroup;
  @Input() rolesIn: Role[];
  @Output() rolesOut = new EventEmitter<Role[]>();
  @Output() displayRoleEditOut = new EventEmitter<boolean>();


  constructor(
    private messageService: MessageService,
    private spinnerService: NgxSpinnerService,
    private userAdministrationService: UserAdministrationService) { 
    }

  ngOnInit(): void { 
  }

  // Fields of Form
  get idField() {
    return this.formRoleIn.get('id');
  }
  get nameField() {
    return this.formRoleIn.get('name');
  }
  get codeField() {
    return this.formRoleIn.get('code');
  }

  onSubmit(event: Event, flag = false) {
    event.preventDefault();
    if (this.formRoleIn.valid) {
      if (this.idField.value) {
        this.updateUser(this.formRoleIn.value);
      } 
    } else {
      this.formRoleIn.markAllAsTouched();
    }
  }

  // Save in backend
    updateUser(role: Role) {
      this.spinnerService.show();
      this.userAdministrationService.updateRole('roles/' + role.id, { role })
        .subscribe(response => {
          this.spinnerService.hide();
          this.messageService.success(response);
          this.saveRole(response['data']);
          this.displayRoleEditOut.emit(false);
        }, error => {
          this.spinnerService.hide();
          this.messageService.error(error);
        });
    }

  // Save in frontend
  saveRole(role: Role) {
    const index = this.rolesIn.findIndex(element => element.id === role.id);
    if (index === -1) {
      this.rolesIn.push(role);
    } else {
      this.rolesIn[index] = role;
    }
    this.rolesOut.emit(this.rolesIn);
  }
}