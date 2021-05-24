import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Language} from '../../../../../models/job-board/language';
import {MessageService} from '../../../../../services/app/message.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {JobBoardHttpService} from '../../../../../services/job-board/job-board-http.service';
import {AppHttpService} from '../../../../../services/app/app-http.service';
import {HttpParams} from '@angular/common/http';
import {Catalogue} from '../../../../../models/app/catalogue';

@Component({
    selector: 'app-language-form',
    templateUrl: './language-form.component.html',
    styleUrls: ['./language-form.component.scss']
})

export class LanguageFormComponent implements OnInit {
    @Input() formLanguageIn: FormGroup;
    @Input() languagesIn: Language[];
    @Output() languagesOut = new EventEmitter<Language[]>();
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
    get idField() {
        return this.formLanguageIn.get('id');
    }

    get idProfessional() {
        return this.formLanguageIn.get('professional');
    }

    get idIdiom() {
        return this.formLanguageIn.get('idiom');
    }

    get idWritten_level() {
        return this.formLanguageIn.get('written_level');
    }

    get idSpoken_level() {
        return this.formLanguageIn.get('spoken_level');
    }

    get idRead_level() {
        return this.formLanguageIn.get('read_level');
    }



    // Submit Form
    onSubmit(event: Event, flag = false) {
        event.preventDefault();
        if (this.formLanguageIn.valid) {
            if (this.idField.value) {
                this.updateLanguage(this.formLanguageIn.value);
            } else {
                this.storeLanguage(this.formLanguageIn.value, flag);
            }
        } else {
            this.formLanguageIn.markAllAsTouched();
        }
    }

    // Types of catalogues
    getTypes() {
        const params = new HttpParams().append('type', 'PROFESSIONAL');
        this.appHttpService.getCatalogues(params).subscribe(response => {
            this.types = response['data'];
        }, error => {
            this.messageService.error(error);
        });
    }

    // Save in backend
    storeLanguage(language: Language, flag = false) {
        this.spinnerService.show();
        this.jobBoardHttpService.store('languages', {language}).subscribe(response => {
            this.spinnerService.hide();
            this.messageService.success(response);
            this.saveLanguage(response['data']);
            if (flag) {
                this.formLanguageIn.reset();
            } else {
                this.displayOut.emit(false);
            }

        }, error => {
            this.spinnerService.hide();
            this.messageService.error(error);
        });
    }

    // Save in backend
    updateLanguage(language: Language) {
        this.spinnerService.show();
        this.jobBoardHttpService.update('languages/' + language.id, {language})
            .subscribe(response => {
                this.spinnerService.hide();
                this.messageService.success(response);
                this.saveLanguage(response['data']);
                this.displayOut.emit(false);
            }, error => {
                this.spinnerService.hide();
                this.messageService.error(error);
            });
    }

    // Save in frontend
    saveLanguage(language: Language) {
        const index = this.languagesIn.findIndex(element => element.id === language.id);
        if (index === -1) {
            this.languagesIn.push(language);
        } else {
            this.languagesIn[index] = language;
        }
        this.languagesOut.emit(this.languagesIn);
    }

    // Filter type of languages
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
