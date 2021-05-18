import { Component, OnInit } from '@angular/core';

import { JobBoardHttpService } from 'src/app/services/job-board/job-board-http.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from '../../../../../services/app/message.service';

@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.scss']
})
export class TotalComponent implements OnInit {

  totalCompanies: number;
  totalOffers: number;
  totalProfessionals: number;

  constructor(
    private jobBoardHttpService: JobBoardHttpService,
    private spinnerService: NgxSpinnerService,
    private messageService: MessageService) {
      this.totalCompanies = 0;
      this.totalOffers = 0;
      this.totalProfessionals = 0;
    }

  ngOnInit(): void {
    this.getTotal();
  }

  getTotal(): void {
    this.spinnerService.show();
    this.jobBoardHttpService.get('web-professional/total').subscribe(
      response => {
        this.spinnerService.hide();
        this.totalCompanies = response['data']['totalCompanies'];
        this.totalOffers = response['data']['totalOffers'];
        this.totalProfessionals = response['data']['totalProfessionals'];
      }, error => {
        this.spinnerService.hide();
        this.messageService.error(error);
      }
    );
  }

}
