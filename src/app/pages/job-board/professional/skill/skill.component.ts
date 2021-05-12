import {Component, OnInit} from '@angular/core';
import {MessageService} from '../../../../services/app/message.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {JobBoardHttpService} from '../../../../services/job-board/job-board-http.service';
import {Skill} from '../../../../models/job-board/skill';
import {Col} from "../../../../models/setting/col";
import {Paginator} from "../../../../models/setting/paginator";
import {HttpParams} from "@angular/common/http";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
    selector: 'app-skill',
    templateUrl: './skill.component.html',
    styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {
    paginator: Paginator;

    skills: Skill[];
    skill: Skill;
    selectedSkills: Skill[];
    colsSkill: Col;
    skillDialog: boolean;
    formSkill: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private messageService: MessageService,
        private spinnerService: NgxSpinnerService,
        private jobBoardHttpService: JobBoardHttpService
    ) {
        this.colsSkill = {header: 'Descripción', field: 'description'};
        this.paginator = {current_page: '1', per_page: '10'};
    }

    ngOnInit(): void {
        this.getSkills({});
        this.buildFormSkill();
    }

    buildFormSkill() {
        this.formSkill = this.formBuilder.group({
            id: [null],
            professional: [null, Validators.required],
            type: [null, Validators.required],
            description: [null, Validators.required],
        });
    }

    getSkills({page = this.paginator.current_page, perPage = this.paginator.per_page}) {
        const params = new HttpParams().append('page', page).append('per_page', perPage);
        this.spinnerService.show();
        this.jobBoardHttpService.get('skills', params).subscribe(response => {
            this.spinnerService.hide();
            this.skills = response['data'];
            this.paginator = response as Paginator;

            console.log(this.paginator);
        }, error => {
            this.spinnerService.hide();
            this.messageService.error(error);
        });
    }

    openNewFormSkill() {
        this.formSkill.reset();
        this.skillDialog = true;
    }

    addSkill(skill: Skill) {
        this.skills.push(skill);
    }

    openEditFormSkill(skill: Skill) {
        this.formSkill.patchValue(skill);
        this.skillDialog = true;
    }

    deleteSkill(skill: Skill) {
        this.spinnerService.show();
        this.jobBoardHttpService.delete('skills/' + skill.id).subscribe(response => {
            this.spinnerService.hide();
            this.messageService.success(response);
        }, error => {
            this.spinnerService.hide();
            this.messageService.error(error);
        });
    }

    removeSkill(skill: Skill) {
        this.skills.filter(element => element !== skill);
    }


    pageChange(event) {
        this.getSkills({page: event.page + 1});
    }

    deleteSelecetedSkills() {
        console.log(this.selectedSkills);
    }
}
