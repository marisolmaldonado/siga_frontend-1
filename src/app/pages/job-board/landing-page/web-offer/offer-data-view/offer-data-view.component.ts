import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Offer} from '../../../../../models/job-board/offer';
import {Paginator} from '../../../../../models/setting/paginator';
import {JobBoardHttpService} from '../../../../../services/job-board/job-board-http.service';
import {HttpParams} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from '../../../../shared/services/message.service';
import {User} from '../../../../../models/auth/user';
import {AuthService} from '../../../../../services/auth/auth.service';

@Component({
    selector: 'app-offer-data-view',
    templateUrl: './offer-data-view.component.html',
    styleUrls: ['./offer-data-view.component.scss']
})
export class OfferDataViewComponent implements OnInit {

    @Input() offers: Offer[];
    paginator: Paginator;
    auth: User;
    displayButtonApply: boolean;
    displayModalFilter: boolean;
    displayMoreInformation: boolean;


    constructor(private spinnerService: NgxSpinnerService,
                private messageService: MessageService,
                private authService: AuthService,
                private jobBoardHttpService: JobBoardHttpService) {
        this.auth = authService.getAuth();
        this.auth ? this.displayButtonApply = true : this.displayButtonApply = false;
    }

    ngOnInit(): void {
    }

    applyOffer(idOffer: string) {
        const params = new HttpParams()
            .append('id', String(idOffer));
        this.spinnerService.show();
        this.jobBoardHttpService.get('web-offer/apply-offer', params).subscribe(
            response => {
                this.spinnerService.hide();
                this.messageService.success(response);
            }, error => {
                this.spinnerService.hide();
                this.messageService.error(error);
            });
    }

    showModalFilter() {
        this.displayModalFilter = true;
    }

    showModalMoreInformation(offer: Offer) {
        this.displayMoreInformation = true;
    }
}
