import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../../../models/auth/user';
import { FormGroup } from '@angular/forms';
import { Paginator } from '../../../../models/setting/paginator';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @Input() usersIn: User[];
  @Input() paginatorIn: Paginator;
  @Input() formUserIn: FormGroup;


  @Output() usersOut = new EventEmitter<User[]>();
  @Output() paginator = new EventEmitter<Paginator>();
  @Output() formUserOut = new EventEmitter<FormGroup>();
  @Output() displayOut = new EventEmitter<boolean>();


  constructor() { }

  ngOnInit(): void {
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
}
