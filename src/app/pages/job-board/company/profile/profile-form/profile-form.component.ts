import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Company } from 'src/app/models/job-board/company';
import {Paginator} from '../../../../../models/setting/paginator';
import {MessageService} from '../../../../../services/app/message.service'; 
import {NgxSpinnerService} from 'ngx-spinner';
import {JobBoardHttpService} from '../../../../../services/job-board/job-board-http.service';
import {FormGroup} from '@angular/forms';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {

  @Input() formCompanyIn: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
