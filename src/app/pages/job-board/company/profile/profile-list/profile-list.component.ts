import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Company } from 'src/app/models/job-board/company';
import {Paginator} from '../../../../../models/setting/paginator';
import {MessageService} from '../../../../../services/app/message.service'; 
import {NgxSpinnerService} from 'ngx-spinner';
import {JobBoardHttpService} from '../../../../../services/job-board/job-board-http.service';
import {FormGroup} from '@angular/forms';
import {HttpParams} from '@angular/common/http';
@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss']
})
export class ProfileListComponent implements OnInit {

    @Input() professionalsIn: Company[];
    @Input() paginatorIn: Paginator;
    @Input() formProfessionalIn: FormGroup;
    @Input() displayIn: boolean;
    @Output() professionalsOut = new EventEmitter<Company[]>();
    @Output() formProfessionalOut = new EventEmitter<FormGroup>();
    @Output() displayOut = new EventEmitter<boolean>();
    @Output() paginatorOut = new EventEmitter<Paginator>();
    selectedProfessionals: any[];
    selectedProfessional: Company;
    dialogUploadFiles: boolean;
    dialogViewFiles: boolean;
    paginatorFiles: Paginator;
  constructor(
    private messageService: MessageService,
    private spinnerService: NgxSpinnerService,
    private jobBoardHttpService: JobBoardHttpService
  ) { 
    this.resetPaginator();
  }
  resetPaginator() {
    this.paginatorFiles = {current_page: '1', per_page: '3'};
}
  ngOnInit() {
  }
 
  pageChange(event) {
    this.paginatorIn.current_page = event.page + 1;
    this.paginatorOut.emit(this.paginatorIn);
}

selectProfessional(professional: Company) {
  this.selectedProfessional = professional;
  console.log(this.selectedProfessional);
}

deleteProfessional(){
  
}
}
