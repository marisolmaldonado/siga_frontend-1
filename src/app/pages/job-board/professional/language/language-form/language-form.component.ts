import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Language} from '../../../../../models/job-board/language';
import {MessageService} from '../../../../shared/services/message.service';
import {MessageService as MessagePnService} from 'primeng/api';
import {NgxSpinnerService} from 'ngx-spinner';
import {JobBoardHttpService} from '../../../../../services/job-board/job-board-http.service';
import {AppHttpService} from '../../../../../services/app/app-http.service';
import {HttpParams} from '@angular/common/http';
import {Catalogue} from '../../../../../models/app/catalogue';
import { SharedService } from '../../../../shared/services/shared.service';


@Component({
    selector: 'app-language-form',
    templateUrl: './language-form.component.html',
    styleUrls: ['./language-form.component.scss']
})

export class LanguageFormComponent implements OnInit {
    @Input() formLanguageIn: FormGroup;
    @Input() languagesIn: Language[];
    @Output()languagesOut = new EventEmitter<Language[]>();
    @Output() displayOut = new EventEmitter<boolean>();
    filteredIdioms: any[];
    idioms: Catalogue[];
    filteredWritten_levels: any[];
    written_levels: Catalogue[];
    filteredSpoken_levels: any[];
    spoken_levels: Catalogue[];
    filteredRead_levels: any[];
    read_levels: Catalogue[];

    constructor(private formBuilder: FormBuilder,
                private messageService: MessageService,
                private messagePnService: MessagePnService,
                private spinnerService: NgxSpinnerService,
                private appHttpService: AppHttpService,
                private sharedService: SharedService,
                private jobBoardHttpService: JobBoardHttpService) {
    }

    ngOnInit(): void {
        this.getIdioms();
        this.getWritten_levels();
        this.getSpoken_levels();
        this.getReadLevels();
    }

    // Fields of Form
    get idField() {
        return this.formLanguageIn.get('id');
    }

    get professionalField() {
        return this.formLanguageIn.get('professional');
    }
    
    get idiomField() {
        return this.formLanguageIn.get('idiom');
    }

    get written_levelField() {
        return this.formLanguageIn.get('written_level');
    }

    get spoken_levelField() {
        return this.formLanguageIn.get('spoken_level');
    }

    get read_levelField() {
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

    // Idiom of catalogues
    getIdioms() {
        const params = new HttpParams().append('idiom', 'LANGUAGE_IDIOM');
        this.appHttpService.getCatalogues(params).subscribe(response => {
            this.idioms = response['data'];
        }, error => {
            this.messageService.error(error);
        });
    }
    // Types of catalogues
getWritten_levels() {
    const params = new HttpParams().append('type', 'LANGUAGE_WRITTEN_LEVEL');
    this.appHttpService.getCatalogues(params).subscribe(response => {
        this.written_levels = response['data'];
    }, error => {
        this.messageService.error(error);
    });
}
  // Types of catalogues
  getSpoken_levels() {
    const params = new HttpParams().append('type', 'LANGUAGE_SPOKEN_LEVEL');
    this.appHttpService.getCatalogues(params).subscribe(response => {
        this.spoken_levels = response['data'];
    }, error => {
        this.messageService.error(error);
    });
}



// Types of catalogues
getReadLevels() {
    const params = new HttpParams().append('read_level', 'LANGUAGE_READLEVEL');
    this.appHttpService.getCatalogues(params).subscribe(response => {
        this.read_levels = response['data'];
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

    // Filter idiom of languages
    filterIdiom(event) {
        const filtered: any[] = [];
        const query = event.query;
        for (const idiom of this.idioms) {
            if (idiom.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(idiom);
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
            this.idiomField.setValue(null);
        }
        this.filteredIdioms = filtered;
    }


 // Filter written Level of languages
 filterWritten_level(event) {
    const filtered: any[] = [];
    const query = event.query;
    for (const written_level of this.written_levels) {
        if (written_level.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
            filtered.push(written_level);
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
        this.written_levelField.setValue(null);
    }
    this.filteredWritten_levels = filtered;
}
//filtro
filterSpoken_level(event) {
    const filtered: any[] = [];
    const query = event.query;
    for (const spoken_level of this.spoken_levels) {
        if (spoken_level.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
            filtered.push(spoken_level);
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
        this.spoken_levelField.setValue(null);
    }
    this.filteredSpoken_levels = filtered;
}
 
// Filter type of skills
filterReadLevel(event) {
    const filtered: any[] = [];
    const query = event.query;
    for (const read_level of this.read_levels) {
        if (read_level.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
            filtered.push(read_level);
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
        this.read_levelField.setValue(null);
    }
    this.filteredRead_levels = filtered;
}


}