import { Component, OnInit } from '@angular/core';

import { JobBoardHttpService } from 'src/app/services/job-board/job-board-http.service';
import { Category } from 'src/app/models/job-board/category';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from '../../../../../services/app/message.service';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss']
})
export class CategoryFilterComponent implements OnInit {

  categories: Category[];
  
  constructor(
    private jobBoardHttpService: JobBoardHttpService,
    private spinnerService: NgxSpinnerService,
    private messageService: MessageService) {
      this.categories = [];
    }

  ngOnInit(): void {
    this.getFilterCategories();
  }

  getFilterCategories(): void {
    this.spinnerService.show();
    this.jobBoardHttpService.get('filter-categories').subscribe(
      response => {
        this.spinnerService.hide();
        this.categories = response['data'];
      }, error => {
        this.spinnerService.hide();
        this.messageService.error(error);
      }
    );
  }

}
