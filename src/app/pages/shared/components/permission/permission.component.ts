import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { UserAdministrationService } from '../../../../services/auth/user-administration.service';
import { MessageService } from '../../services/message.service';
import {NgxSpinnerService} from 'ngx-spinner';
import { HttpParams } from '@angular/common/http';
import {Col} from '../../../../models/setting/col';
import { Permission } from 'src/app/models/auth/permission'; 

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {

  @Input() permissionsIn: Permission[];
  @Input() permissionsRole: Permission[];
  @Input() roleName: String;
  @Input() roleId: String;
  @Output() displayOut = new EventEmitter<boolean>();

  colsPermission: Col[];
  permissions: any[];
 
  constructor(
    private userAdministrationService: UserAdministrationService,
    private messageService: MessageService,
    private spinnerService: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    this.loadColsUser();
  }

  loadColsUser() {
    this.colsPermission = [
        {field: 'name', header: 'Nombre'},
        {field: 'actions', header: 'Acciónes'},
      ];
  }

  setRoles() {
    const ids = this.permissionsRole.map(element => element.id);
      let params = new HttpParams().append('id', this.roleId.toString());
      this.spinnerService.show();
    this.userAdministrationService.set('user-admin/setPermissions', ids, params)
      .subscribe(response => {
        this.spinnerService.hide();
          this.messageService.success(response);
          this.permissionsRole = [];
          this.displayOut.emit(false);
        }, error => {
         this.messageService.error(error);
      });
    }
}
