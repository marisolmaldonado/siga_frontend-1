import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Skill} from "../../../../../models/job-board/skill";
import {MessageService} from "../../../../../services/app/message.service";
import {NgxSpinnerService} from "ngx-spinner";
import {JobBoardHttpService} from "../../../../../services/job-board/job-board-http.service";
import {AppHttpService} from "../../../../../services/app/app-http.service";

@Component({
    selector: 'app-skill-form',
    templateUrl: './skill-form.component.html',
    styleUrls: ['./skill-form.component.scss']
})
export class SkillFormComponent implements OnInit {
    @Input() displayIn: boolean;
    @Input() skillIn: FormGroup;
    @Output() skillOut = new EventEmitter<Skill>();
    @Output() displayOut = new EventEmitter<boolean>();
    filteredTypes: any[];
    types: any[];

    constructor(private formBuilder: FormBuilder,
                private messageService: MessageService,
                private spinnerService: NgxSpinnerService,
                private appService: AppHttpService,
                private jobBoardHttpService: JobBoardHttpService) {
        console.log('asd');
    }

    ngOnInit(): void {

    }

    onSubmit(event: Event) {
        event.preventDefault();
        if (this.skillIn.valid) {
            this.save();
        } else {
            this.skillIn.markAllAsTouched();
        }
    }

    getTypes() {
        this.jobBoardHttpService.get('types').subscribe(response => {

        });
    }

    save() {
        this.skillOut.emit(this.skillIn.value);
    }

    storeSkill(skill: Skill) {
        this.spinnerService.show();
        this.jobBoardHttpService.update('skills/' + skill.id, this.skillIn).subscribe(response => {
            this.spinnerService.hide();
            this.messageService.success(response);
        }, error => {
            this.spinnerService.hide();
            this.messageService.error(error);
        });
    }

    updateSkill(skill: Skill) {
        this.spinnerService.show();
        this.jobBoardHttpService.update('skills/' + skill.id, this.skillIn).subscribe(response => {
            this.spinnerService.hide();
            this.messageService.success(response);
        }, error => {
            this.spinnerService.hide();
            this.messageService.error(error);
        });
    }

    hideDialog() {
        this.displayOut.emit(false);
    }

    filterType(event) {
        let filtered: any[] = [];
        let query = event.query;
        for (let i = 0; i < this.types.length; i++) {
            let type = this.types[i];
            if (type.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(type);
            }
        }

        this.filteredTypes = filtered;
    }

}
