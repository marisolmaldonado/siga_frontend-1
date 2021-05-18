import { Component, OnInit } from '@angular/core';

import { JobBoardHttpService } from 'src/app/services/job-board/job-board-http.service';
import { Category } from 'src/app/models/job-board/category';
import { TreeNode } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from '../../../../../services/app/message.service';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss']
})
export class CategoryFilterComponent implements OnInit {

  categories: Category[];
  treeNode: TreeNode[];
  
  constructor(
    private jobBoardHttpService: JobBoardHttpService,
    private spinnerService: NgxSpinnerService,
    private messageService: MessageService) {
      this.categories = [];
      this.treeNode = [];
    }

  ngOnInit(): void {
    this.getFilterCategories();
  }

  getFilterCategories(): void {
    this.spinnerService.show();
    this.jobBoardHttpService.get('web-professional/filter-categories').subscribe(
      response => {
        this.spinnerService.hide();
        this.categories = response['data'];
        this.treeNode = this.categoryToTreeNode(this.categories);
      }, error => {
        this.spinnerService.hide();
        this.messageService.error(error);
      }
    );
  }

  categoryToTreeNode(categories: Category[]): TreeNode[] {
    let treeNode: TreeNode[] = [];

    categories.forEach(category => {
      let treeNodeChildren: TreeNode[] = [];

      category.children.forEach(child => {
        treeNodeChildren.push({label: child.name});
      })

      treeNode.push({label: category.name, children: treeNodeChildren});
    });

    return treeNode;
  }

}
