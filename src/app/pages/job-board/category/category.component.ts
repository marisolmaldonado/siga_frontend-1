import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Category } from 'src/app/models/job-board/category';
import { Paginator } from 'src/app/models/setting/paginator';
import { JobBoardHttpService } from 'src/app/services/job-board/job-board-http.service';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';
import { MessageService } from '../../shared/services/message.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  paginator: Paginator;
  categories:Category;
  formCategory:FormGroup;
  items:any;
  data:Category;
  constructor(private spinnerService: NgxSpinnerService,
              private messageService: MessageService,
              private formBuilder: FormBuilder,
              private jobBoardHttpService: JobBoardHttpService,
             ) {
      this.paginator = {current_page: 1, per_page: 10};
     
  }

  ngOnInit(): void {
    this.getCategories(this.paginator);
      this.buildFormCategory();
      this.items = [
        {label:'Categories'},
        {label:'Sports'},
        {label:'Football'},
        {label:'Countries'},
        {label:'Spain'},
        {label:'F.C. Barcelona'},
        {label:'Squad'},
        {label:'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi'}
    ];
  }

buildFormCategory() {
  this.formCategory = this.formBuilder.group({
    // VERIFICAR CAMPOS Y SI TODOS SON REQUERIDOS Y CON EL MINIMO
      parent: [null],
      code: [null, Validators.required],
      name: [null, Validators.required],
      icon: [null, Validators.required],
     // children: this.formBuilder.array([this.formBuilder.control(null, Validators.required)]),

  });
}

getCategories(paginator: Paginator){
  this.spinnerService.show();
  const params = new HttpParams()
            .append('page', paginator.current_page.toString())
            .append('per_page', paginator.per_page.toString());
  this.jobBoardHttpService.get('categories').subscribe(
    response=>{
      this.spinnerService.hide();
      this.categories = response['data'];
      console.log(this.categories);
     
    },
    error=>{
      this.spinnerService.hide();
      this.messageService.error(error);
    }
  )

}

}




