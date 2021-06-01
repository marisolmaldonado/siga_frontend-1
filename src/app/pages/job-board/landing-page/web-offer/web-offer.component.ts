import { Component, OnInit } from '@angular/core';

// servicios
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from '../../../shared/services/message.service';
import { FormBuilder } from '@angular/forms';
import { JobBoardHttpService } from '../../../../services/job-board/job-board-http.service';
import { HttpParams } from '@angular/common/http';

// Modelos
import { Paginator } from '../../../../models/setting/paginator';
import { Offer, Category, SearchParams } from '../../../../models/job-board/models.index';
import { User } from '../../../../models/auth/user';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
    selector: 'app-web-offer',
    templateUrl: './web-offer.component.html',
    styleUrls: ['./web-offer.component.scss']
})
export class WebOfferComponent implements OnInit {

    /*--------------------------------------------------*
     * Atributos y variables.
     *--------------------------------------------------*/
    offers: Offer[];
    paginator: Paginator;
    treeData: any[];
    categories: Category[];
    displayModalFilter: boolean;
    selectedCategories: any;
    auth: User;

    offerView: Offer;
    displayMoreInformation: boolean;
    failPaginator: any = {
        per_page: '9',
        current_page: '1',
    };
    failSearchParams: SearchParams = {
        searchCode: null,
        searchLocation: null,
        searchProvince: null,
        searchCanton: null,
        searchPosition: null,
    };

    constructor(private spinnerService: NgxSpinnerService,
        private messageService: MessageService,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private jobBoardHttpService: JobBoardHttpService) {
        this.auth = authService.getAuth();
    }

    ngOnInit() {
        this.getOffers(this.failPaginator, this.failSearchParams);
        this.getCategories();
    }

    getOffers(paginator: Paginator, searchParams: SearchParams) {
        const params = new HttpParams()
            .append('page', String(paginator.current_page))
            .append('per_page', String(paginator.per_page));

        const routeFilter = this.auth ? 'private-offers' : 'public-offers';
        console.log(routeFilter);
        this.spinnerService.show();
        this.jobBoardHttpService.get('web-offer/public-offers', params).subscribe(
            response => {
                this.spinnerService.hide();
                this.offers = response['data'];
                this.paginator = response as any;
            }, error => {
                this.spinnerService.hide();
                console.log(error);
            });
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

    getCategories() {
        this.spinnerService.show();
        this.jobBoardHttpService.get('web-offer/get-categories').subscribe(
            response => {
                this.spinnerService.hide();
                this.categories = response['data'];
                this.modificationDataCategory(response['data']);
                console.log(this.treeData);
            }, error => {
                this.spinnerService.hide();
                this.messageService.error(error);
                console.log(error);
            });
    }

    modificationDataCategory(categories) {
        const treeData = [];

        for (const category of categories) {
            const nodeChildren = [];
            for (const child of category.children) {
                nodeChildren.push({ id: child.id, label: child.name });
            }
            treeData.push({ id: category.id, label: category.name, children: nodeChildren });
        }
        this.treeData = treeData;
    }

    test() {
        console.log(this.selectedCategories);
    }

    showModalFilter() {
        this.displayModalFilter = true;
    }

    showModalMoreInformation(offer: Offer) {
        this.displayMoreInformation = true;
        this.offerView = offer;
    }
}

