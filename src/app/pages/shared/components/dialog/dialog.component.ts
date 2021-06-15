import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { UserAdministrationService } from '../../../../services/auth/user-administration.service';
import { MessageService } from '../../../shared/services/message.service';
import {NgxSpinnerService} from 'ngx-spinner';
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

  colsRole: Col[];
  roles: any[];
  
  
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
    this.colsRole = [
        {field: 'name', header: 'Nombre'},
        {field: 'code', header: 'Código'},
      ];
  }

  setRoles() {
  const ids = this.rolesUser.map(element => element.id);
    let params = new HttpParams().append('id', this.userId.toString());
    this.spinnerService.show();
  this.userAdministrationService.set('user-admin/setRoles', ids, params)
    .subscribe(response => {
      this.spinnerService.hide();
        this.messageService.success(response);
        this.rolesUser = [];
        this.displayOut.emit(false);
      }, error => {
       this.messageService.error(error);
    });
  }
}
