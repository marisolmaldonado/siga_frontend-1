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
  @Input() userRole: String;
  
  colsRole: Col[];
  roles: Role[];
  constructor(
    private userAdministrationService: UserAdministrationService,
    private messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
    this.loadColsUser();
    this.getRoles();
  }

  loadColsUser() {
    this.colsRole = [
        {field: 'name', header: 'Nombre'},
        {field: 'code', header: 'Código'},
      ];
  }

  getRoles() {
    const params = new HttpParams()
    this.userAdministrationService.get('user-admin/roles', params).subscribe(
        response => {
            this.roles = response['data'];
            console.log(this.roles);
        }, error => {
            this.messageService.error(error);
        });
}
  }
