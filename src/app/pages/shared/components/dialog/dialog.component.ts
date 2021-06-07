import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Col} from '../../../../models/setting/col';
import {Paginator} from '../../../../models/setting/paginator';
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
