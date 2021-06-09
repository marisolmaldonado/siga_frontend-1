import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { UserAdministrationService } from '../../../../services/auth/user-administration.service';
import { MessageService } from '../../../shared/services/message.service';
import { HttpParams } from '@angular/common/http';
import {Col} from '../../../../models/setting/col';
import { Role } from 'src/app/models/auth/role';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  @Input() rolesIn: Role[];
  @Input() rolesUser: Role[];
  @Input() userName: String;
  @Input() userId: String;
  @Output() displayOut = new EventEmitter<boolean>();
  
  selectedRoles: any[];
  colsRole: Col[];
  roles: any[];
  
  
  constructor(
    private userAdministrationService: UserAdministrationService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.loadColsUser();
  }

  loadColsUser() {
    this.colsRole = [
        {field: 'name', header: 'Nombre'},
        {field: 'code', header: 'Código'},
      ];
  }

  setRoles(user = null) {
  if (user) {
    this.selectedRoles = [];
    this.selectedRoles.push(user);
   }
  const ids = this.selectedRoles.map(element => element.id);
    let params = new HttpParams().append('id', this.userId.toString());
  this.userAdministrationService.delete('user-admin/setRoles', ids, params)
    .subscribe(response => {
        this.messageService.success(response);
        this.selectedRoles = [];
        this.displayOut.emit(false);
      }, error => {
       this.messageService.error(error);
    });
  }
}
