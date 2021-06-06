import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
<<<<<<< HEAD
import { Professional,Company } from 'src/app/models/job-board/models.index';
=======
import { Company } from 'src/app/models/job-board/company';
>>>>>>> mod_6_jobboard
import {Paginator} from '../../../../../models/setting/paginator';
import {MessageService} from '../../../../shared/services/message.service'; 
import {NgxSpinnerService} from 'ngx-spinner';
import {JobBoardHttpService} from '../../../../../services/job-board/job-board-http.service';
import {FormGroup} from '@angular/forms';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-professional-list',
  templateUrl: './professional-list.component.html',
  styleUrls: ['./professional-list.component.scss']
})
export class ProfessionalListComponent implements OnInit {
<<<<<<< HEAD

=======
>>>>>>> mod_6_jobboard
  @Input() professionalsIn: Company[];
  @Input() paginatorIn: Paginator;
  @Input() formProfessionalIn: FormGroup;
  @Output() professionalsOut = new EventEmitter<Company[]>();
  @Output() formProfessionalOut = new EventEmitter<FormGroup>();
  @Output() displayOut = new EventEmitter<boolean>();
  @Output() paginatorOut = new EventEmitter<Paginator>();
<<<<<<< HEAD
  Professionals: any[];
=======
  selectedProfessionals: any[];
>>>>>>> mod_6_jobboard
  selectedProfessional: Company;
  dialogUploadFiles: boolean;
  paginatorFiles: Paginator;

  constructor(
    private messageService: MessageService,
    private spinnerService: NgxSpinnerService,
    private jobBoardHttpService: JobBoardHttpService
<<<<<<< HEAD
  ) { 

  }
=======
  ) { }
>>>>>>> mod_6_jobboard

  ngOnInit() {
  }

  pageChange(event) {
    this.paginatorIn.current_page = event.page + 1;
    this.paginatorOut.emit(this.paginatorIn);
  }

<<<<<<< HEAD


  deleteProfessional(id:string) {
    this.messageService.questionDelete({})
            .then((result) => {
              if(result.isConfirmed){
                let params = new HttpParams().append('professional_id', id);
                this.jobBoardHttpService.get('company/detach', params).subscribe(response => {
                  this.remove(id);
                  this.spinnerService.hide();
                }, error => {
                  this.spinnerService.hide();
                  this.messageService.error(error);
                });
              }
            });

  }

  
  remove(id) {
   
        this.professionalsIn = this.professionalsIn.filter(element => element.id !== id);
        this.professionalsOut.emit(this.professionalsIn);
}

=======
  selectProfessional(professional: Company) {
    this.selectedProfessional = professional;
    console.log(this.selectedProfessional);
  }
  deleteProfessional(){
  }
>>>>>>> mod_6_jobboard
}
