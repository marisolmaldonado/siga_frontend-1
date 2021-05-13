import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Skill} from '../../../../../models/job-board/skill';
import {FormGroup} from '@angular/forms';
import {Col} from '../../../../../models/setting/col';
import {Paginator} from '../../../../../models/setting/paginator';
import {MessageService} from '../../../../../services/app/message.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {JobBoardHttpService} from '../../../../../services/job-board/job-board-http.service';
import {HttpParams} from '@angular/common/http';

@Component({
    selector: 'app-skill-list',
    templateUrl: './skill-list.component.html',
    styleUrls: ['./skill-list.component.scss']
})
export class SkillListComponent implements OnInit {
    @Input() skillsIn: Skill[];
    @Input() paginatorIn: Paginator;
    @Input() formSkillIn: FormGroup;
    @Input() displayIn: boolean;
    @Output() skillsOut = new EventEmitter<Skill[]>();
    @Output() formSkillOut = new EventEmitter<FormGroup>();
    @Output() displayOut = new EventEmitter<boolean>();
    @Output() paginatorOut = new EventEmitter<Paginator>();
    colsSkill: Col;
    selectedSkills: any[];

    constructor(private messageService: MessageService,
                private spinnerService: NgxSpinnerService,
                private jobBoardHttpService: JobBoardHttpService) {
        this.colsSkill = {header: 'Descripción', field: 'description'};
    }

    ngOnInit(): void {
    }

    // Search skills in backend
    searchSkills(event, search) {
        if (event.type === 'click' || event.keyCode === 13 || search.length === 0) {
            const params = search.length > 0 ? new HttpParams().append('search', search) : null;
            this.spinnerService.show();
            this.jobBoardHttpService.get('skills', params).subscribe(response => {
                this.skillsIn = response['data'],
                    this.spinnerService.hide();
            }, error => {
                this.spinnerService.hide();
                this.messageService.error(error);
            });
        }
    }

    openNewFormSkill() {
        this.formSkillIn.reset();
        this.formSkillOut.emit(this.formSkillIn);
        this.displayOut.emit(true);
    }

    openEditFormSkill(skill: Skill) {
        this.formSkillIn.patchValue(skill);
        this.formSkillOut.emit(this.formSkillIn);
        this.displayOut.emit(true);
    }

    pageChange(event) {
        this.paginatorIn.current_page = event.page + 1;
        this.paginatorOut.emit(this.paginatorIn);
    }

    deleteSkill(skill: Skill) {
        this.messageService.questionDelete({})
            .then((result) => {
                if (result.isConfirmed) {
                    this.spinnerService.show();
                    this.jobBoardHttpService.delete('skill/delete', {ids: skill.id})
                        .subscribe(response => {
                            this.spinnerService.hide();
                            this.messageService.success(response);
                            this.removeSkill(skill);
                        }, error => {
                            this.spinnerService.hide();
                            this.messageService.error(error);
                        });
                }
            });
    }

    removeSkill(skill: Skill) {
        this.skillsIn = this.skillsIn.filter(element => element !== skill);
        this.skillsOut.emit(this.skillsIn);
    }

    deleteSkills() {
        this.messageService.questionDelete({})
            .then((result) => {
                if (result.isConfirmed) {
                    const ids = this.selectedSkills.map(element => element.id);
                    this.spinnerService.show();
                    this.jobBoardHttpService.delete('skill/delete', {ids})
                        .subscribe(response => {
                            this.spinnerService.hide();
                            this.messageService.success(response);
                            this.removeSkills(ids);
                        }, error => {
                            this.spinnerService.hide();
                            this.messageService.error(error);
                        });
                }
            });

    }

    removeSkills(ids) {
        for (const id of ids) {
            this.skillsIn = this.skillsIn.filter(element => element.id !== id);
        }
        this.skillsOut.emit(this.skillsIn);
    }
}
