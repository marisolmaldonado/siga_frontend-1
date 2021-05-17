import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessageService} from '../../../../../services/app/message.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {JobBoardHttpService} from '../../../../../services/job-board/job-board-http.service';
import {AppHttpService} from '../../../../../services/app/app-http.service';
import {HttpParams} from '@angular/common/http';
import {Catalogue} from '../../../../../models/app/catalogue';
import { Offer } from 'src/app/models/job-board/offer';

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
        return this.formOfferIn.get('id');
    }

    get typeField() {
        return this.formOfferIn.get('type');
    }

    get descriptionField() {
        return this.formOfferIn.get('description');
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
            this.formOfferIn.markAllAsTouched();
        }
    }

    // Types of catalogues
    getTypes() {
        const params = new HttpParams().append('type', 'OFFER_TYPE');
        this.appHttpService.getCatalogues(params).subscribe(response => {
            this.types = response['data'];
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

    // Filter type of offers
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
