import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Reference} from '../../../../../models/job-board/reference';
import {MessageService} from '../../../../../services/app/message.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {JobBoardHttpService} from '../../../../../services/job-board/job-board-http.service';
import {AppHttpService} from '../../../../../services/app/app-http.service';
import {HttpParams} from '@angular/common/http';
import {Catalogue} from '../../../../../models/app/catalogue';

@Component({
    selector: 'app-reference-form',
    templateUrl: './reference-form.component.html',
    styleUrls: ['./reference-form.component.scss']
})

export class ReferenceFormComponent implements OnInit {
    @Input() formReferenceIn: FormGroup;
    @Input() referencesIn: Reference[];
    @Output() referencesOut = new EventEmitter<Reference[]>();
    @Output() displayOut = new EventEmitter<boolean>();
    filteredTypes: any[];
    types: Catalogue[];
    formAddress: FormGroup;
    formLocation: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private messageService: MessageService,
                private messagePnService: MessageService,
                private spinnerService: NgxSpinnerService,
                private appHttpService: AppHttpService,
                private jobBoardHttpService: JobBoardHttpService) {
    }

    ngOnInit(): void {
        this.getTypes();
    }

    // Fields of Form
    get idField() {
        return this.formReferenceIn.get('id');
    }

    get professionalField() {
        return this.formReferenceIn.get('professional');
    }
    

    get institutionField() {
        return this.formReferenceIn.get('institution');
    }

    get positionField() {
        return this.formReferenceIn.get('position');
    }

    get contactNameField() {
        return this.formReferenceIn.get('contact_name');
    }

    get contactPhoneField() {
        return this.formReferenceIn.get('contact_phon');
    }

    get contactEmailField() {
        return this.formReferenceIn.get('contact_email');
    }

   
    // Submit Form
    onSubmit(event: Event, flag = false) {
        event.preventDefault();
        if (this.formReferenceIn.valid) {
            if (this.idField.value) {
                this.updateReference(this.formReferenceIn.value);
            } else {
                this.storeReference(this.formReferenceIn.value, flag);
            }
        } else {
            this.formReferenceIn.markAllAsTouched();
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
    storeReference(reference: Reference, flag = false) {
        this.spinnerService.show();
        this.jobBoardHttpService.store('references', {reference}).subscribe(response => {
            this.spinnerService.hide();
            this.messageService.success(response);
            this.saveReference(response['data']);
            if (!flag) {
                this.displayOut.emit(false);
            }

        }, error => {
            this.spinnerService.hide();
            this.messageService.error(error);
        });
    }

    // Save in backend
    updateReference(reference: Reference) {
        this.spinnerService.show();
        this.jobBoardHttpService.update('referencels/' + reference.id, {reference})
            .subscribe(response => {
                this.spinnerService.hide();
                this.messageService.success(response);
                this.saveReference(response['data']);
                this.displayOut.emit(false);
            }, error => {
                this.spinnerService.hide();
                this.messageService.error(error);
            });
    }

    // Save in frontend
    saveReference(reference: Reference) {
        const index = this.referencesIn.findIndex(element => element.id === reference.id);
        if (index === -1) {
            this.referencesIn.push(reference);
        } else {
            this.referencesIn[index] = reference;
        }
        this.referencesOut.emit(this.referencesIn);
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
        this.filteredTypes = filtered;
    }
    }
