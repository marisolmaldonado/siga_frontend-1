import {Component, OnInit} from '@angular/core';

// servicios
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from '../../../../services/app/message.service';
import {FormBuilder} from '@angular/forms';
import {JobBoardHttpService} from '../../../../services/job-board/job-board-http.service';
import {HttpParams} from '@angular/common/http';

// Modelos
import {Paginator} from '../../../../models/setting/paginator';
import {Offer, Category, SearchParams} from '../../../../models/job-board/models.index';

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
    categories: Category[];
    displayModalFilter: boolean;

    offerView: Offer;
    displayMoreInformation: boolean;
    files2: any[];


    data = {
        'data':
            [
                {
                    'label': 'Documents',
                    'data': 'Documents Folder',
                    'expandedIcon': 'pi pi-folder-open',
                    'collapsedIcon': 'pi pi-folder',
                    'children': [{
                        'label': 'Work',
                        'data': 'Work Folder',
                        'expandedIcon': 'pi pi-folder-open',
                        'collapsedIcon': 'pi pi-folder',
                        'children': [{'label': 'Expenses.doc', 'icon': 'pi pi-file', 'data': 'Expenses Document'}, {
                            'label': 'Resume.doc',
                            'icon': 'pi pi-file',
                            'data': 'Resume Document'
                        }]
                    },
                        {
                            'label': 'Home',
                            'data': 'Home Folder',
                            'expandedIcon': 'pi pi-folder-open',
                            'collapsedIcon': 'pi pi-folder',
                            'children': [{'label': 'Invoices.txt', 'icon': 'pi pi-file', 'data': 'Invoices for this month'}]
                        }]
                },
                {
                    'label': 'Pictures',
                    'data': 'Pictures Folder',
                    'expandedIcon': 'pi pi-folder-open',
                    'collapsedIcon': 'pi pi-folder',
                    'children': [
                        {'label': 'barcelona.jpg', 'icon': 'pi pi-image', 'data': 'Barcelona Photo'},
                        {'label': 'logo.jpg', 'icon': 'pi pi-image', 'data': 'PrimeFaces Logo'},
                        {'label': 'primeui.png', 'icon': 'pi pi-image', 'data': 'PrimeUI Logo'}]
                },
                {
                    'label': 'Movies',
                    'data': 'Movies Folder',
                    'expandedIcon': 'pi pi-folder-open',
                    'collapsedIcon': 'pi pi-folder',
                    'children': [{
                        'label': 'Al Pacino',
                        'data': 'Pacino Movies',
                        'children': [{'label': 'Scarface', 'icon': 'pi pi-video', 'data': 'Scarface Movie'}, {
                            'label': 'Serpico',
                            'icon': 'pi pi-video',
                            'data': 'Serpico Movie'
                        }]
                    },
                        {
                            'label': 'Robert De Niro',
                            'data': 'De Niro Movies',
                            'children': [{
                                'label': 'Goodfellas',
                                'icon': 'pi pi-video',
                                'data': 'Goodfellas Movie'
                            }, {'label': 'Untouchables', 'icon': 'pi pi-video', 'data': 'Untouchables Movie'}]
                        }]
                }
            ]
    };

    selectedFile: any;

    failPaginator: any = {
        per_page: '9',
        current_page: '1',
    };

    failSearchParams: SearchParams = {
        searchCode: null,
        searchWideField: null,
        searchSpecificField: null,
        searchLocation: null
    };

    constructor(private spinnerService: NgxSpinnerService,
                private messageService: MessageService,
                private formBuilder: FormBuilder,
                private jobBoardHttpService: JobBoardHttpService) {
    }

    ngOnInit() {
        this.files2 = this.data['data'];
        this.getOffers(this.failPaginator, this.failSearchParams);
        this.getCategories();
    }

    getOffers(paginator: Paginator, searchParams: SearchParams) {
        const params = new HttpParams()
            .append('page', paginator.current_page)
            .append('per_page', paginator.per_page);

        this.spinnerService.show();
        this.jobBoardHttpService.store('web-offer/index', searchParams, params).subscribe(
            response => {
                this.spinnerService.hide();
                this.offers = response['data'].data;
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
                this.offers = response['data'].data;
                this.paginator = response as any;
            }, error => {
                this.spinnerService.hide();
                console.log(error);
            });
    }

    getCategories() {
        // const params = new HttpParams()
        //     .append('page', paginator.current_page)
        //     .append('per_page', paginator.per_page);

        this.spinnerService.show();
        this.jobBoardHttpService.get('web-offer/get-categories').subscribe(
            response => {
                this.spinnerService.hide();
                this.categories = response['data'];
                this.paginator = response as Paginator;
                console.log(this.paginator);
                // console.log(`categorias ==> ${JSON.stringify(this.categories)}`);
            }, error => {
                this.spinnerService.hide();
                this.messageService.error(error);
                console.log(error);
            });
    }

    showModalFilter() {
        this.displayModalFilter = true;
    }

    showModalMoreInformation(offer: Offer) {
        this.displayMoreInformation = true;
        this.offerView = offer;
    }
}

