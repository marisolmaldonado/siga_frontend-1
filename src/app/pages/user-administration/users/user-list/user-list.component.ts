import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../../../models/auth/user';
import { FormGroup } from '@angular/forms';
import { Paginator } from '../../../../models/setting/paginator';
import {MessageService} from '../../../../services/app/message.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {UserAdministrationService } from '../../../../services/auth/user-administration.service';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @Input() usersIn: User[];
  @Input() paginatorIn: Paginator;
  @Input() formUserIn: FormGroup;
  paginatorFiles: Paginator;
  selectedUsers: any[];
  selectedUser: User;


  @Output() usersOut = new EventEmitter<User[]>();
  @Output() paginator = new EventEmitter<Paginator>();
  @Output() formUserOut = new EventEmitter<FormGroup>();
  @Output() displayOut = new EventEmitter<boolean>();
  @Output() paginatorOut = new EventEmitter<Paginator>();


  constructor(private messageService: MessageService,
    private spinnerService: NgxSpinnerService,
    private userAdministrationService: UserAdministrationService) {
      this.resetPaginator();
  }

  resetPaginator() {
    this.paginatorFiles = {current_page: 1, per_page: 5};
  }
  ngOnInit(): void {
  }

  searchUsers(event, search) {
    if (event.type === 'click' || event.keyCode === 13 || search.length === 0) {
        const params = search.length > 0 ? new HttpParams().append('search', search) : null;
        this.spinnerService.show();
        this.userAdministrationService.get('user-admins', params).subscribe(response => {
            this.usersIn = response['data'],
                this.spinnerService.hide();
        }, error => {
            this.spinnerService.hide();
            this.messageService.error(error);
        });
    }
}

  sendUsers() {
    this.usersOut.emit(this.usersIn);
  }
  openNewFormUser() {
    this.formUserIn.reset();
    this.formUserOut.emit(this.formUserIn);
    this.displayOut.emit(true);
  }
  openEditFormUser(user: User) {
    this.formUserIn.patchValue(user);
    this.formUserOut.emit(this.formUserIn);
    this.displayOut.emit(true);
  }

  pageChange(event) {
    this.paginatorIn.current_page = event.page + 1;
    this.paginatorOut.emit(this.paginatorIn);
}

  deleteUsers(skill = null) {
    this.messageService.questionDelete({})
        .then((result) => {
            if (result.isConfirmed) {
                if (skill) {
                    this.selectedUsers = [];
                    this.selectedUsers.push(skill);
                }

                const ids = this.selectedUsers.map(element => element.id);
                this.spinnerService.show();
                this.userAdministrationService.delete('user-admin/delete', ids)
                    .subscribe(response => {
                        this.spinnerService.hide();
                        this.messageService.success(response);
                        this.removeUsers(ids);
                        this.selectedUsers = [];
                    }, error => {
                        this.spinnerService.hide();
                        this.messageService.error(error);
                    });
            }
        });

}

removeUsers(ids) {
  for (const id of ids) {
      this.usersIn = this.usersIn.filter(element => element.id !== id);
  }
  this.usersOut.emit(this.usersIn);
}
}
