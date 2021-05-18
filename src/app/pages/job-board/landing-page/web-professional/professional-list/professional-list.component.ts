import { Component, OnInit } from '@angular/core';

import { JobBoardHttpService } from 'src/app/services/job-board/job-board-http.service';
import { Professional } from 'src/app/models/job-board/professional';
import { Paginator } from '../../../../../models/setting/paginator';
import { HttpParams } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from '../../../../../services/app/message.service';

@Component({
  selector: 'app-professional-list',
  templateUrl: './professional-list.component.html',
  styleUrls: ['./professional-list.component.scss']
})
export class ProfessionalListComponent implements OnInit {
  paginator: Paginator;
  professionals: Professional[];

  constructor(
    private jobBoardHttpService: JobBoardHttpService,
    private spinnerService: NgxSpinnerService,
    private messageService: MessageService) {
      this.paginator = {current_page: '1', per_page: '9'};
      this.professionals = [];
    }

  ngOnInit(): void {
    this.getProfessionals(this.paginator);
  }

  getProfessionals(paginator: Paginator): void {
    const params = new HttpParams()
            .append('page', paginator.current_page)
            .append('per_page', paginator.per_page);

    this.spinnerService.show();
    this.jobBoardHttpService.store('web-professional/professionals', params).subscribe(
      response => {
        this.spinnerService.hide();
        this.professionals = response['data'];
        this.paginator = response as Paginator;
      }, error => {
        this.spinnerService.hide();
        this.messageService.error(error);
      }
    );
  }

}
