import { Component, OnInit } from '@angular/core';

import { JobBoardHttpService } from 'src/app/services/job-board/job-board-http.service';
import { Professional } from 'src/app/models/job-board/professional';
import { Paginator } from '../../../../../models/setting/paginator';
import { HttpParams } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'src/app/pages/shared/services/message.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-professional-list',
  templateUrl: './professional-list.component.html',
  styleUrls: ['./professional-list.component.scss']
})
export class ProfessionalListComponent implements OnInit {
  paginator: Paginator;
  professionals: Professional[];
  body: any;

  constructor(
    private jobBoardHttpService: JobBoardHttpService,
    private spinnerService: NgxSpinnerService,
    private messageService: MessageService,
    private authService: AuthService) {
      this.paginator = {current_page: 1, per_page: 9};
      this.professionals = [];
      this.body = {ids: null, search: null};
    }

  ngOnInit(): void {
    this.getProfessionals(this.paginator, this.body);
  }

  getProfessionals(paginator: Paginator, body: any): void {
    const params = new HttpParams()
            .append('page', paginator.current_page.toString())
            .append('per_page', paginator.per_page.toString());

    this.spinnerService.show();
    this.jobBoardHttpService.store('web-professional/professionals', body, params).subscribe(
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

  pageChange(event): void {
    this.paginator.current_page = event.page + 1;
    this.getProfessionals(this.paginator, this.body);
  }

  getSelectedCategories(event: number[]): void {
    this.body.ids = event;
    this.getProfessionals(this.paginator, this.body);
  }

  getSearch(event: string): void {
    this.body.search = event;
    this.getProfessionals(this.paginator, this.body);
  }

  professionalAplied(professional: Professional): void {
    const user = this.authService.getAuth();
    
    if (user) {
      const params = new HttpParams()
        .append('professional_id', professional.id.toString())
        .append('user_id', user.id.toString());

      this.spinnerService.show();
      this.jobBoardHttpService.get('web-professional/apply-professional', params).subscribe(
        response => {
          this.spinnerService.hide();
          this.messageService.success(response);
        },
        error => {
          this.spinnerService.hide();
          this.messageService.error(error);
        }
      );
    } else {
      console.error('Primero necesitas iniciar sesión');
    }
  }
}
