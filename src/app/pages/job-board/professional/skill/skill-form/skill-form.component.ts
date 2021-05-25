import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Skill} from '../../../../../models/job-board/skill';
import {MessageService} from '../../../../shared/services/message.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {JobBoardHttpService} from '../../../../../services/job-board/job-board-http.service';
import {AppHttpService} from '../../../../../services/app/app-http.service';
import {HttpParams} from '@angular/common/http';
import {Catalogue} from '../../../../../models/app/catalogue';
import {MessageService as MessagePnService} from 'primeng/api';
import {SharedService} from '../../../../shared/services/shared.service';

@Component({
    selector: 'app-skill-form',
    templateUrl: './skill-form.component.html',
    styleUrls: ['./skill-form.component.scss']
})

export class SkillFormComponent implements OnInit {
    @Input() formSkillIn: FormGroup;
    @Input() skillsIn: Skill[];
    @Output() skillsOut = new EventEmitter<Skill[]>();
    @Output() displayOut = new EventEmitter<boolean>();
    filteredTypes: any[];
    types: Catalogue[];
    formAddress: FormGroup;
    formLocation: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private messageService: MessageService,
                private messagePnService: MessagePnService,
                private spinnerService: NgxSpinnerService,
                private appHttpService: AppHttpService,
                private sharedService: SharedService,
                private jobBoardHttpService: JobBoardHttpService) {
    }

    ngOnInit(): void {
        this.getTypes();
    }

    // Fields of Form
    get addressField() {
        return this.formSkillIn.get('address');
    }

    get locationField() {
        return this.formSkillIn.get('location');
    }

    get startDateField() {
        return this.formSkillIn.get('start_date');
    }

    get endDateField() {
        return this.formSkillIn.get('start_date');
    }

    get idField() {
        return this.formSkillIn.get('id');
    }

    get typeField() {
        return this.formSkillIn.get('type');
    }

    get descriptionField() {
        return this.formSkillIn.get('description');
    }

    // Submit Form
    onSubmit(event: Event, flag = false) {
        event.preventDefault();
        if (this.formSkillIn.valid) {
            if (this.idField.value) {
                this.updateSkill(this.formSkillIn.value);
            } else {
                this.storeSkill(this.formSkillIn.value, flag);
            }
        } else {
            this.markAllAsTouchedFormSkill();
        }
    }

    // Types of catalogues
    getTypes() {
        const params = new HttpParams().append('type', 'SKILL_TYPE');
        this.appHttpService.getCatalogues(params).subscribe(response => {
            this.types = response['data'];
        }, error => {
            this.messageService.error(error);
        });
    }

    // Save in backend
    storeSkill(skill: Skill, flag = false) {
        this.spinnerService.show();
        this.jobBoardHttpService.store('skills', {skill}).subscribe(response => {
            this.spinnerService.hide();
            this.messageService.success(response);
            this.saveSkill(response['data']);
            if (!flag) {
                this.displayOut.emit(false);
            }
            this.resetFormSkill();

        }, error => {
            this.spinnerService.hide();
            this.messageService.error(error);
        });
    }

    // Save in backend
    updateSkill(skill: Skill) {
        this.spinnerService.show();
        this.jobBoardHttpService.update('skills/' + skill.id, {skill})
            .subscribe(response => {
                this.spinnerService.hide();
                this.messageService.success(response);
                this.saveSkill(response['data']);
                this.displayOut.emit(false);
            }, error => {
                this.spinnerService.hide();
                this.messageService.error(error);
            });
    }

    // Save in frontend
    saveSkill(skill: Skill) {
        const index = this.skillsIn.findIndex(element => element.id === skill.id);
        if (index === -1) {
            this.skillsIn.push(skill);
        } else {
            this.skillsIn[index] = skill;
        }
        this.skillsOut.emit(this.skillsIn);
    }

    // Filter type of skills
    filterType(event) {
        const filtered: any[] = [];
        const query = event.query;
        for (const type of this.types) {
            if (type.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(type);
            }
        }
        if (filtered.length === 0) {
            this.messagePnService.clear();
            this.messagePnService.add({
                severity: 'error',
                summary: 'Por favor seleccione un tipo del listado',
                detail: 'En el caso de no existir comuníquese con el administrador!',
                life: 5000
            });
            this.typeField.setValue(null);
        }
        this.filteredTypes = filtered;
    }

    test(event) {
        event.markAllAsTouched();
    }

    resetFormSkill() {
        this.formSkillIn.reset();
        this.formLocation.reset();
        this.formAddress.reset();
    }

    markAllAsTouchedFormSkill() {
        this.formSkillIn.markAllAsTouched();
        this.formLocation.markAllAsTouched();
        this.formAddress.markAllAsTouched();
    }

    setFormLocation(event) {
        this.formLocation = event;
    }
}
