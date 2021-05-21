import {Component, OnInit} from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {JobBoardHttpService} from '../../../../services/job-board/job-board-http.service';
import {Skill} from '../../../../models/job-board/skill';
import {Paginator} from '../../../../models/setting/paginator';
import {HttpParams} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';
import {BreadcrumbService} from '../../../../shared/services/breadcrumb.service';
import {MessageService} from '../../../../services/app/message.service';
import {DateValidators} from "../../../shared/validators/date.validators";

@Component({
    selector: 'app-skill',
    templateUrl: './skill.component.html',
    styleUrls: ['./skill.component.scss']
})

export class SkillComponent implements OnInit {
    paginator: Paginator;
    skills: Skill[];
    formSkill: FormGroup;
    skill: Skill;
    skillDialog: boolean;
    flagSkills: boolean;

    constructor(
        private spinnerService: NgxSpinnerService,
        private messageService: MessageService,
        private formBuilder: FormBuilder,
        private jobBoardHttpService: JobBoardHttpService) {

        this.paginator = {current_page: '1', per_page: '5'};
        this.skills = [];
    }

    ngOnInit(): void {
        this.getSkills(this.paginator);
        this.buildFormSkill();
    }

    // Build form skill
    buildFormSkill() {
        this.formSkill = this.formBuilder.group({
            id: [null],
            address: [null, Validators.required],
            location: [null, Validators.required],
            start_date: [null, Validators.required, DateValidators.valid],
            end_date: [null, Validators.required, DateValidators.valid],
            type: [null, Validators.required],
            description: [null, [Validators.required, Validators.minLength(10)]],
        });
    }

    // skills of backend
    getSkills(paginator: Paginator) {
        const params = new HttpParams()
            .append('page', paginator.current_page)
            .append('per_page', paginator.per_page);

        this.flagSkills = true;
        // this.spinnerService.show();
        this.jobBoardHttpService.get('skills', params).subscribe(
            response => {
                // this.spinnerService.hide();
                this.flagSkills = false;
                this.skills = response['data'];
                this.paginator = response as Paginator;
            }, error => {
                // this.spinnerService.hide();
                this.flagSkills = false;
                this.messageService.error(error);
            });
    }
}
