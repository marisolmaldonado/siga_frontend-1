import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { MessageService } from '../../../shared/services/message.service';
import { HttpParams } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from '../../../../models/auth/user';
import { UserAdministrationService } from '../../../../services/auth/user-administration.service';
import { Role } from 'src/app/models/auth/role';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  @Input() formUserIn: FormGroup;
  @Input() usersIn: User[];
  @Input() rolesIn: Role[];
  @Output() usersOut = new EventEmitter<User[]>();
  @Output() displayOut = new EventEmitter<boolean>();

  selectedRoles: any[];

  constructor(
    private messageService: MessageService,
    private spinnerService: NgxSpinnerService,
    private userAdministrationService: UserAdministrationService) { 
    }

  ngOnInit(): void {
  }
  // Fields of Form
  get idField() {
    return this.formUserIn.get('id');
  }
  get identificationField() {
    return this.formUserIn.get('identification');
  }
  get firstNameField() {
    return this.formUserIn.get('names');
  }
  get firstLastnameField() {
    return this.formUserIn.get('first_lastname');
  }
  get secondLastnameField() {
    return this.formUserIn.get('second_lastname');
  }
  get emailField() {
    return this.formUserIn.get('email');
  }

  get rolesField() {
    return this.formUserIn.get('roles');
  }

  storeUser(user: User, flag = false) {
    this.spinnerService.show();
    this.userAdministrationService.store('user-admins', { user }).subscribe(response => {
      this.spinnerService.hide();
      this.messageService.success(response);
      if (flag) {
        this.formUserIn.reset();
      } else {
        this.displayOut.emit(false);
      }

    }, error => {
      this.spinnerService.hide();
      this.messageService.error(error);
    });
  }

  onSubmit(event: Event, flag = false) {
    event.preventDefault();
    if (this.formUserIn.valid) {
        this.storeUser(this.formUserIn.value, flag);
    } else {
      this.formUserIn.markAllAsTouched();
    }
  }

  saveRoles(role = null) {
    if (role) {
      this.selectedRoles = [];
      this.selectedRoles.push(role);
    }
    const ids = this.selectedRoles;
    this.userAdministrationService.add('user-admin/addRoles', ids)
    .subscribe(response => {
      this.messageService.success(response);
      this.selectedRoles = [];
     }, error => {
      this.messageService.error(error);
    });
  }
}
