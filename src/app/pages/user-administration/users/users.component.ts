import {Component, OnInit} from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserAdministrationService} from '../../../services/auth/user-administration.service';
import {User} from '../../../models/auth/user';
import {Paginator} from '../../../models/setting/paginator';
import {HttpParams} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';
import {BreadcrumbService} from '../../../shared/services/breadcrumb.service';
import {MessageService} from '../../../services/app/message.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  paginator: Paginator;
  users: User[];
  formUser: FormGroup;
  user: User;
  userDialog: boolean;
  flagUsers: boolean;

  constructor(
    private spinnerService: NgxSpinnerService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private userAdministrationService: UserAdministrationService,
    private breadcrumbService: BreadcrumbService) {

      this.breadcrumbService.setItems([
          {label: 'Dashboard', routerLink: ['/dashboard']},
          {label: 'user administration'}
      ]);
      this.paginator = {current_page: 1, per_page: 5};
      this.users = [];
    }

  ngOnInit(): void {
    this.getUsers(this.paginator);
  }

   // Users of backend
   getUsers(paginator: Paginator) {
    const params = new HttpParams()
        .append('page', paginator.current_page.toString())
        .append('per_page', paginator.per_page.toString());

    this.flagUsers = true;
    this.spinnerService.show();
    this.userAdministrationService.get('user-admins', params).subscribe(
        response => {
            this.spinnerService.hide();
            this.flagUsers = false;
            this.users = response['data'];
            this.paginator = response as Paginator;
            console.log(this.users);
        }, error => {
            this.spinnerService.hide();
            this.flagUsers = false;
            this.messageService.error(error);
        });
}

}
