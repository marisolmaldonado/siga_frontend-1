import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Experience } from '../../../../../models/job-board/experience';
import {MessageService} from '../../../../shared/services/message.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { JobBoardHttpService } from '../../../../../services/job-board/job-board-http.service';
import { AppHttpService } from '../../../../../services/app/app-http.service';
import { HttpParams } from '@angular/common/http';
import { Catalogue } from '../../../../../models/app/catalogue';

@Component({
    selector: 'app-experience-form',
    templateUrl: './experience-form.component.html',
    styleUrls: ['./experience-form.component.scss']
})

export class ExperienceFormComponent implements OnInit {
    @Input() formExperienceIn: FormGroup;
    @Input() experiencesIn: Experience[];
    @Output() experiencesOut = new EventEmitter<Experience[]>();
    @Output() displayOut = new EventEmitter<boolean>();
    filteredTypes: any[];
    types: Catalogue[];

    constructor(private formBuilder: FormBuilder,
        private messageService: MessageService,
        private spinnerService: NgxSpinnerService,
        private appHttpService: AppHttpService,
        private jobBoardHttpService: JobBoardHttpService) {
    }

    ngOnInit(): void {
        this.getTypes();
    }

    // Fields of Form
    get addressField() {
        return this.formExperienceIn.get('address');
    }

    get locationField() {
        return this.formExperienceIn.get('location');
    }

    get startDateField() {
        return this.formExperienceIn.get('start_date');
    }

    get endDateField() {
        return this.formExperienceIn.get('start_date');
    }

    get idField() {
        return this.formExperienceIn.get('id');
    }

    get typeField() {
        return this.formExperienceIn.get('type');
    }

    get descriptionField() {
        return this.formExperienceIn.get('description');
    }

    // Submit Form
    onSubmit(event: Event, flag = false) {
        event.preventDefault();
        if (this.formExperienceIn.valid) {
            if (this.idField.value) {
                this.updateExperience(this.formExperienceIn.value);
            } else {
                this.storeExperience(this.formExperienceIn.value, flag);
            }
        } else {
            this.formExperienceIn.markAllAsTouched();
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
    storeExperience(experience: Experience, flag = false) {
        this.spinnerService.show();
        this.jobBoardHttpService.store('experiences', { experience }).subscribe(response => {
            this.spinnerService.hide();
            this.messageService.success(response);
            this.saveExperience(response['data']);
            if (flag) {
                this.formExperienceIn.reset();
            } else {
                this.displayOut.emit(false);
            }

        }, error => {
            this.spinnerService.hide();
            this.messageService.error(error);
        });
    }

    // Save in backend
    updateExperience(experience: Experience) {
        this.spinnerService.show();
        this.jobBoardHttpService.update('experiences/' + experience.id, { experience })
            .subscribe(response => {
                this.spinnerService.hide();
                this.messageService.success(response);
                this.saveExperience(response['data']);
                this.displayOut.emit(false);
            }, error => {
                this.spinnerService.hide();
                this.messageService.error(error);
            });
    }

    // Save in frontend
    saveExperience(experience: Experience) {
        const index = this.experiencesIn.findIndex(element => element.id === experience.id);
        if (index === -1) {
            this.experiencesIn.push(experience);
        } else {
            this.experiencesIn[index] = experience;
        }
        this.experiencesOut.emit(this.experiencesIn);
    }

    // Filter type of experiences
    filterType(event) {
        const filtered: any[] = [];
        const query = event.query;
        for (const type of this.types) {
            if (type.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(type);
            }
        }
        this.filteredTypes = filtered;
    }
}
