import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/auth/user';
import { Company } from '../../../../models/job-board/company';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DateValidators } from 'src/app/pages/shared/validators/date.validators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formRegister: FormGroup;
  company: Company;
  user: User;
  registerDialog: boolean;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void{
    this.buildFormRegister();
  }

  buildFormRegister(){

    this.formRegister = this.formBuilder.group({

      user: this.formBuilder.group({
        username:[null, Validators.required],
        identification:[null, Validators.required],
        email:[null, Validators.required],
        password:[null, Validators.required],
        password_confirmation:[null, Validators.required],
        address:[null, Validators.required],
        location:[null,Validators.required],
        status:[null,Validators.required],
        identificationType:[null, Validators.required],
        date:[null,[Validators.required,DateValidators.valid]]
        
      }), 
      trade_name:[null, Validators.required],
      comercial_activities:[null, Validators.required],
      web:[null, Validators.required],
      type:[null, Validators.required],
      activityType:[null, Validators.required],
      personType:[null, Validators.required],
  
    });
    console.log(this.formRegister['controls']['user']['controls']['identificationType'])
  }
}
