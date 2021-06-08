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
  
  colsRole: Col[];
  roles: Role[];
  
  constructor() {
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


  }
