import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
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
  
  constructor() {
  }

  ngOnInit(): void {
  }
  }
