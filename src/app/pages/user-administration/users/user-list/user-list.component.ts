import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../../models/auth/user';
import {Paginator} from "../../../../models/setting/paginator";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @Input() usersIn: User[];
  @Input() paginatorIn: Paginator;
  @Output () usersOut: EventEmitter<User[]> = new EventEmitter();
  @Output () paginator: EventEmitter<Paginator> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  sendUsers(){
    this.usersOut.emit(this.usersIn);
  }
}
