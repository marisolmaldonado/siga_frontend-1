import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../../models/auth/user';
import {Paginator} from '../../../../models/setting/paginator';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @Input() usersIn: User[];
  @Input() paginatorIn: Paginator;
  @Output () usersOut = new EventEmitter<User[]>();
  @Output () paginator = new EventEmitter<Paginator>();

  constructor() { }

  ngOnInit(): void {
  }

  sendUsers(){
    this.usersOut.emit(this.usersIn);
  }
}
