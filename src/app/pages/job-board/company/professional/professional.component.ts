import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobBoardHttpService } from '../../../../services/job-board/job-board-http.service';
import { Company } from 'src/app/models/job-board/company';
import { Paginator } from '../../../../models/setting/paginator';
import { HttpParams } from '@angular/common/http';
import {MessageService} from '../../../shared/services/message.service'
@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.scss']
})
export class ProfessionalComponent implements OnInit {

  paginator: Paginator;
  professionals: Company[];
  professional:Company;
  formProfessional:FormGroup;
  flagProfessionals:boolean;
  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private jobBoardHttpService: JobBoardHttpService
  ) {

    this.paginator = { current_page: 1, per_page: 4 };

    this.professionals = [];
   }

  ngOnInit(): void {
    this.buildFormProfessional();
    this.getProfesionals(this.paginator);
  }
  buildFormProfessional() {
    this.formProfessional = this.formBuilder.group({
      user: this.formBuilder.group({
        full_name: [null, Validators.required],
        personal_email: [null, Validators.required],
        phone: [null, Validators.required],
      }),
    });
  }

  getProfesionals(paginator: Paginator) {
    const params = new HttpParams()
      .append('page', paginator.current_page.toString())
      .append('per_page', paginator.per_page.toString());
      this.flagProfessionals = true;
    this.jobBoardHttpService.get('company/professionals', params).subscribe(
      response => {
       this.flagProfessionals = false;
        this.professionals = response['data'];
        console.log(this.professionals)
        this.paginator = response as Paginator;
      }, error => {
        this.flagProfessionals = false;
        this.messageService.error(error);
      });
  }

}
