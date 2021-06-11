import { Component, OnInit } from '@angular/core';
import { Company } from '../../../../models/job-board/company';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Validations} from './utils/validations';
import {JobBoardHttpService} from '../../../../services/job-board/job-board-http.service';
import { CustomValidators } from 'src/app/pages/shared/validators/custom-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formRegister: FormGroup;
  company: Company;
  
  constructor(
    private formBuilder: FormBuilder,
    private jobBoardHttpService: JobBoardHttpService,

  ) { }

  ngOnInit(): void{
    this.buildFormRegister();
  }

  buildFormRegister() {
    this.formRegister = this.formBuilder.group({
      user: this.formBuilder.group({
        username: [null, Validators.required],
        identification: [null, Validators.required,Validations.validateIdentification(this.jobBoardHttpService)],
        email: [null, Validators.required],
        password: [null, Validators.required],
        password_confirmation: [null, Validators.required],
        address: [null],
        identification_type: [null, Validators.required],
      },{validator:[CustomValidators.passwordMatchValidator,Validations.identificationMatchValidator]}),
      trade_name: [null, Validators.required],
      prefix:[null,Validators.required],
      comercial_activities: this.formBuilder.array([
        this.formBuilder.control(null, Validators.required)
      ]),
      web: [null, Validators.required],
      type: [null, Validators.required],
      activity_type: [null, Validators.required],
      person_type: [null, Validators.required],


    });
    console.log(this.formRegister['controls']['user']);
  } 
}
