import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserAdministrationService } from '../../../../services/auth/user-administration.service';
import { FormGroup } from '@angular/forms';
import { MessageService } from '../../../shared/services/message.service';
import { Role } from 'src/app/models/auth/role';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/models/auth/user';

@Component({
  selector: 'app-user-edit-form',
  templateUrl: './user-edit-form.component.html',
  styleUrls: ['./user-edit-form.component.scss']
})
export class UserEditFormComponent implements OnInit {

  @Input() formUserIn: FormGroup;
  @Input() usersIn: User[];
  @Input() rolesIn: Role[];
  @Output() usersOut = new EventEmitter<User[]>();
  @Output() displayEditOut = new EventEmitter<boolean>();


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

  onSubmit(event: Event, flag = false) {
    event.preventDefault();
    if (this.formUserIn.valid) {
      if (this.idField.value) {
        this.updateUser(this.formUserIn.value);
      } 
    } else {
      this.formUserIn.markAllAsTouched();
    }
  }

    // Save in backend
    updateUser(user: User) {
      this.spinnerService.show();
      this.userAdministrationService.update('user-admins/' + user.id, { user })
        .subscribe(response => {
          this.spinnerService.hide();
          this.messageService.success(response);
          this.saveUser(response['data']);
          this.displayEditOut.emit(false);
        }, error => {
          this.spinnerService.hide();
          this.messageService.error(error);
        });
    }

      // Save in frontend
  saveUser(user: User) {
    const index = this.usersIn.findIndex(element => element.id === user.id);
    if (index === -1) {
      this.usersIn.push(user);
    } else {
      this.usersIn[index] = user;
    }
    this.usersOut.emit(this.usersIn);
  }

}
