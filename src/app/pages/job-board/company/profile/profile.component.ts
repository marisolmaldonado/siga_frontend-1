import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobBoardHttpService } from '../../../../services/job-board/job-board-http.service';
import { Company } from 'src/app/models/job-board/company';
import { Paginator } from '../../../../models/setting/paginator';
import { HttpParams } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from '../../../../services/app/message.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  paginator: Paginator;
  professionals: Company[];
  professional:Company;
  formCompany: FormGroup;
  formProfessional:FormGroup;
  company: Company;
  companyDialog: boolean;


  constructor(
    private spinnerService: NgxSpinnerService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private jobBoardHttpService: JobBoardHttpService
  ) {
    this.paginator = { current_page: '1', per_page: '3' };
    this.professionals = [];
  }

  ngOnInit(): void {
    this.buildFormCompany();
    this.buildFormProfessional();
    this.getProfesionals(this.paginator);
  }
  //Formulario de compañia//
  buildFormCompany() {
    this.formCompany = this.formBuilder.group({
      trade_name: [null, Validators.required],
      comercial_activities: this.formBuilder.array([
        this.formBuilder.control(null, Validators.required)
      ]),
      web: [null, Validators.required],
      type: [null, Validators.required],
      activityType: [null, Validators.required],
      personType: [null, Validators.required],
    });
  }
  // Formulario de profesional//
  buildFormProfessional() {
    this.formProfessional = this.formBuilder.group({
      user: this.formBuilder.group({
        full_name: [null, Validators.required],
        personal_email: [null, Validators.required],
        phone: [null, Validators.required],
      }),
    });
    console.log(this.formProfessional['controls']['user']);
  }

  getProfesionals(paginator: Paginator) {
    const params = new HttpParams()
      .append('page', paginator.current_page)
      .append('per_page', paginator.per_page);
    this.spinnerService.show();
    this.jobBoardHttpService.get('company/professionals', params).subscribe(
      response => {
        this.spinnerService.hide();
        this.professionals = response['data'];
        console.log(this.professionals)
        this.paginator = response as Paginator;
      }, error => {
        this.spinnerService.hide();
        this.messageService.error(error);
      });
  }
}
