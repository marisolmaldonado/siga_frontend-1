import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessageService} from '../../../../../services/app/message.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {JobBoardHttpService} from '../../../../../services/job-board/job-board-http.service';
import {AppHttpService} from '../../../../../services/app/app-http.service';
import {HttpParams} from '@angular/common/http';
import {Catalogue} from '../../../../../models/app/catalogue';
import { Offer } from 'src/app/models/job-board/offer';
import { Location } from 'src/app/models/app/location';

@Component({
    selector: 'app-offer-form',
    templateUrl: './offer-form.component.html',
    styleUrls: ['./offer-form.component.scss']
})

export class OfferFormComponent implements OnInit {
    @Input() formOfferIn: FormGroup;
    @Input() offersIn: Offer[];
    @Output() offersOut = new EventEmitter<Offer[]>();
    @Output() displayOut = new EventEmitter<boolean>();
    filteredContracTypes: any[];
    contractTypes: Catalogue[];
    filteredPositions: any[];
    positions: Catalogue[];
    filteredSectors: any[];
    sectors: Catalogue[];
    filteredWorkingDays: any[];
    workingDays: Catalogue[];
    filteredExperienceTimes: any[];
    experienceTimes: Catalogue[];
    filteredTrainingHours: any[];
    trainingHours: Catalogue[];
    filteredlocations: any[];
    locations: Location[];

    constructor(private formBuilder: FormBuilder,
                private messageService: MessageService,
                private spinnerService: NgxSpinnerService,
                private appHttpService: AppHttpService,
                private jobBoardHttpService: JobBoardHttpService) {
    }

    ngOnInit(): void {
        this.getContractType();
        this.getPosition();
        this.getSector();
        this.getWorkingDay();
        this.getExperienceTime();
        this.getTrainingHours();
        this.getLocation();
    }

    // Fields of Form
    get idField() {
        return this.formOfferIn.get('id');
    }
    get vacanciesField() {
        return this.formOfferIn.get('vacancies');
    }
    get descriptionField() {
        return this.formOfferIn.get('description');
    }
    get aditionalInformationField() {
        return this.formOfferIn.get('aditional_information');
    }
    get contactNameField() {
        return this.formOfferIn.get('contact_name');
    }
    get contactEmailField() {
        return this.formOfferIn.get('contact_email');
    }
    get contactPhoneField() {
        return this.formOfferIn.get('contact_phone');
    }
    get contactCellphoneField() {
        return this.formOfferIn.get('contact_cellphone');
    }
    get remunerationField() {
        return this.formOfferIn.get('remuneration');
    }
    get contractTypeField() {
        return this.formOfferIn.get('contract_type');
    }
    get positionField() {
        return this.formOfferIn.get('position');
    }
    get sectorField() {
        return this.formOfferIn.get('sector');
    }
    get workingDayField() {
        return this.formOfferIn.get('working_day');
    }
    get experienceTimeField() {
        return this.formOfferIn.get('experience_time');
    }
    get trainingHoursField() {
        return this.formOfferIn.get('training_hours');
    }
    get locationField() {
        return this.formOfferIn.get('location');
    }

    // Submit Form
    onSubmit(event: Event, flag = false) {
        event.preventDefault();
        if (this.formOfferIn.valid) {
            if (this.idField.value) {
                this.updateOffer(this.formOfferIn.value);
            } else {
                this.storeOffer(this.formOfferIn.value, flag);
            }
        } else {
            // quitar validaciones y llenar todos los campos requeridos
            // quitar end_date de todo angular 
            this.formOfferIn.markAllAsTouched();
        }
    }

    // Get Catalogues 
    getContractType() {
        const params = new HttpParams().append('type', 'OFFER_CONTRACT_TYPE');
        this.appHttpService.getCatalogues(params).subscribe(response => {
            this.contractTypes = response['data'];
        }, error => {
            this.messageService.error(error);
        });
    }
    getPosition() {
        const params = new HttpParams().append('type', 'OFFER_POSITION');
        this.appHttpService.getCatalogues(params).subscribe(response => {
            this.positions = response['data'];
        }, error => {
            this.messageService.error(error);
        });
    }
    getSector() {
        const params = new HttpParams().append('type', 'SECTOR');
        this.appHttpService.getCatalogues(params).subscribe(response => {
            this.sectors = response['data'];
        }, error => {
            this.messageService.error(error);
        });
    }
    getWorkingDay() {
        const params = new HttpParams().append('type', 'OFFER_WORKING_DAY');
        this.appHttpService.getCatalogues(params).subscribe(response => {
            this.workingDays = response['data'];
        }, error => {
            this.messageService.error(error);
        });
    }
    getExperienceTime() {
        const params = new HttpParams().append('type', 'OFFER_EXPERIENCE_TIME');
        this.appHttpService.getCatalogues(params).subscribe(response => {
            this.experienceTimes = response['data'];
        }, error => {
            this.messageService.error(error);
        });
    }
    getTrainingHours() {
        const params = new HttpParams().append('type', 'OFFER_TRAINING_HOURS');
        this.appHttpService.getCatalogues(params).subscribe(response => {
            this.trainingHours = response['data'];
        }, error => {
            this.messageService.error(error);
        });
    }
    getLocation() {
        const params = new HttpParams().append('type', 'LOCATION');
        this.appHttpService.getCatalogues(params).subscribe(response => {
            this.locations = response['data'];
        }, error => {
            this.messageService.error(error);
        });
    }

    // Save in backend
    storeOffer(offer: Offer, flag = false) {
        this.spinnerService.show();

        this.jobBoardHttpService.store('offers', {offer}).subscribe(response => {
            this.spinnerService.hide();
            this.messageService.success(response);
            this.saveOffer(response['data']);
            if (flag) {
                this.formOfferIn.reset();
            } else {
                this.displayOut.emit(false);
            }

        }, error => {
            this.spinnerService.hide();
            this.messageService.error(error);
        });
    }

    // Save in backend
    updateOffer(offer: Offer) {
        this.spinnerService.show();
        this.jobBoardHttpService.update('offers/' + offer.id, {offer})
            .subscribe(response => {
                this.spinnerService.hide();
                this.messageService.success(response);
                this.saveOffer(response['data']);
                this.displayOut.emit(false);
            }, error => {
                this.spinnerService.hide();
                this.messageService.error(error);
            });
    }

    // Save in frontend
    saveOffer(offer: Offer) {
        const index = this.offersIn.findIndex(element => element.id === offer.id);
        if (index === -1) {
            this.offersIn.push(offer);
        } else {
            this.offersIn[index] = offer;
        }
        this.offersOut.emit(this.offersIn);
    }

    // Filters offers
    filterContracType(event) {
        const filtered: any[] = [];
        const query = event.query;
        for (const contractType of this.contractTypes) {
            if (contractType.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(contractType);
            }
        }
        this.filteredContracTypes = filtered;
    }

    filterPosition(event) {
        const filtered: any[] = [];
        const query = event.query;
        for (const position of this.positions) {
            if (position.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(position);
            }
        }
        this.filteredPositions = filtered;
    }

    filterSector(event) {
        const filtered: any[] = [];
        const query = event.query;
        for (const sector of this.sectors) {
            if (sector.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(sector);
            }
        }
        this.filteredSectors = filtered;
        console.log(this.filteredSectors);
    }

    filterWorkingDay(event) {
        const filtered: any[] = [];
        const query = event.query;
        for (const workingDay of this.workingDays) {
            if (workingDay.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(workingDay);
            }
        }
        this.filteredWorkingDays = filtered;
    }

    filterExperienceTime(event) {
        const filtered: any[] = [];
        const query = event.query;
        for (const experienceTime of this.experienceTimes) {
            if (experienceTime.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(experienceTime);
            }
        }
        this.filteredExperienceTimes = filtered;
    }

    filterTrainingHour(event) {
        const filtered: any[] = [];
        const query = event.query;
        for (const trainingHour of this.trainingHours) {
            if (trainingHour.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(trainingHour);
            }
        }
        this.filteredTrainingHours = filtered;
    }

    filterLocation(event) {
        const filtered: any[] = [];
        const query = event.query;
        for (const location of this.locations) {
            if (location.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(location);
            }
        }
        this.filteredlocations = filtered;
    }
}
