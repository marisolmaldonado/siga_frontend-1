import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../../../../services/app/message.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from '../../../../models/auth/user';
import { UserAdministrationService } from '../../../../services/auth/user-administration.service';
import { AppService } from '../../../../services/app/app.service';
import { PasswordModule } from 'primeng/password';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  @Input() formUserIn: FormGroup;
  @Input() usersIn: User[];

  @Output() usersOut = new EventEmitter<User[]>();
  @Output() displayOut = new EventEmitter<boolean>();


  constructor(private formBuilder: FormBuilder,
    private messageService: MessageService,
    private spinnerService: NgxSpinnerService,
    private appHttpService: AppService,
    private userAdministrationService: UserAdministrationService) { }

  ngOnInit(): void {
  }
  // Fields of Form
  get idField() {
    return this.formUserIn.get('id');
  }
  get usernameField() {
    return this.formUserIn.get('username');
  }
  get identificationField() {
    return this.formUserIn.get('identification');
  }
  get firstNameField() {
    return this.formUserIn.get('first_name');
  }
  get secondNameField() {
    return this.formUserIn.get('second_name');
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
  get passwordField() {
    return this.formUserIn.get('password');
  }
  get phoneField() {
    return this.formUserIn.get('phone');
  }
  get personalEmailField() {
    return this.formUserIn.get('personal_email');
  }

  // Save in backend
  storeUser(user: User, flag = false) {
    this.spinnerService.show();
    this.userAdministrationService.store('user-admins', { user }).subscribe(response => {
      this.spinnerService.hide();
      this.messageService.success(response);
      this.saveUser(response['data']);
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

  // Submit Form
  onSubmit(event: Event, flag = false) {
    event.preventDefault();
    if (this.formUserIn.valid) {
      if (this.idField.value) {
        this.updateUser(this.formUserIn.value);
      } else {
        this.storeUser(this.formUserIn.value, flag);
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
        this.displayOut.emit(false);
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
