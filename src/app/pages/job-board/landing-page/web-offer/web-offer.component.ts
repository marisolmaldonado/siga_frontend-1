import {Component, OnInit} from '@angular/core';

// servicios
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from '../../../shared/services/message.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {JobBoardHttpService} from '../../../../services/job-board/job-board-http.service';
import {HttpParams} from '@angular/common/http';

// Modelos
import {Paginator} from '../../../../models/setting/paginator';
import {Offer, Category, SearchParams} from '../../../../models/job-board/models.index';
import {User} from '../../../../models/auth/user';
import {AuthService} from '../../../../services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-web-offer',
    templateUrl: './web-offer.component.html',
    styleUrls: ['./web-offer.component.scss']
})
export class WebOfferComponent implements OnInit {

    auth: User;
    items: object[];
    offers: Offer[];
    treeData: any[];
    paginator: Paginator;
    scrollHeight = '10px';
    formCodeFilter: FormGroup;
    formMoreFilters: FormGroup;
    categories: Category[];
    displayCodeFilter: boolean;
    displayMoreFilters: boolean;
    displayModalFilter: boolean;
    selectedCategories: Category[];
    searchParams: SearchParams;
    location: any;


    constructor(private spinnerService: NgxSpinnerService,
                private messageService: MessageService,
                private authService: AuthService,
                private formBuilder: FormBuilder,
                private jobBoardHttpService: JobBoardHttpService) {
        this.auth = authService.getAuth();
        this.paginator = {
            per_page: 9,
            current_page: 1,
        };
        this.setDefaultParamsSearch();
    }

    ngOnInit() {
        this.buildForms();
        this.getOffers(this.paginator, this.searchParams);
        this.getCategories();
        this.items = [
            {
                label: 'Filtrar por código', icon: 'pi pi-percentage', command: () => {
                    this.showModalFilter('code');
                }
            },
            {
                label: 'Más filtros', icon: 'pi pi-plus', command: () => {
                    this.showModalFilter('moreFilter');
                }
            }
        ];
    }

    buildForms() {
        this.formMoreFilters = this.formBuilder.group({
            ids: [null],
            position: [null],
            wideField: [null],
            specificField: [null],
        });
        this.formCodeFilter = this.formBuilder.group({
            code: [null],
        });
    }

    filterForCode() {
        const params: SearchParams = this.searchParams;

        params.searchCode = this.formCodeFilter.value.code;
        this.getOffers(this.paginator, params);
        this.displayModalFilter = false;
    }

    filterForMore() {
        const params: SearchParams = this.searchParams;

        params.searchPosition = this.formMoreFilters.value.position;
        if (!(this.location.value.country === null)) {
            params.searchProvince = this.location.value.province.id;
            params.searchCanton = this.location.value.canton.id;
        }
        // params.searchWideField = this.formMoreFilters.value.wideField;
        // params.searchSpecificField = this.formMoreFilters.value.specificField;

        this.getOffers(this.paginator, params);
        this.displayModalFilter = false;
    }

    getOffers(paginator: Paginator, searchParams: SearchParams) {
        const params = new HttpParams()
            .append('page', String(paginator.current_page))
            .append('per_page', String(paginator.per_page));
        const routeFilter = this.auth ? 'private-offers' : 'public-offers';
        this.spinnerService.show();
        this.jobBoardHttpService.store(`web-offer/${routeFilter}`, searchParams, params).subscribe(
            response => {
                this.spinnerService.hide();
                this.offers = response['data'];
                this.paginator = response as any;
            }, error => {
                this.spinnerService.hide();
                console.log(error);
            });
    }

    pageChange(currentPage): void {
        this.paginator.current_page = currentPage.page + 1;
        this.getOffers(this.paginator, this.searchParams);
    }

    getCategories(): void {
        this.spinnerService.show();
        this.jobBoardHttpService.get('web-offer/get-categories').subscribe(
            response => {
                this.spinnerService.hide();
                this.categories = response['data'];
                this.modificationDataCategory(response['data']);
                if (this.scrollHeight === undefined || this.scrollHeight.length === 0) {
                    this.scrollHeight = '10px';
                } else {
                    this.scrollHeight = '60vh';
                }
            }, error => {
                this.spinnerService.hide();
                this.messageService.error(error);
                console.log(error);
            });
    }

    modificationDataCategory(categories): void {
        const treeData = [];

        for (const category of categories) {
            const nodeChildren = [];
            for (const child of category.children) {
                nodeChildren.push({id: child.id, label: child.name});
            }
            treeData.push({id: category.id, label: category.name, children: nodeChildren});
        }
        this.treeData = treeData;
    }

    filterForCategoriesSelected(): void {
        if (this.selectedCategories === undefined) {
            Swal.fire({
                title: 'Sin categorías.',
                text: 'Seleccione una categoría.',
                icon: 'info'
            });
        } else {
            const idsCategories = [];
            const search: SearchParams = this.searchParams;

            for (const category of this.selectedCategories) {
                idsCategories.push(category.id);
            }
            search.searchIDs = idsCategories;

            this.getOffers(this.paginator, search);
        }
    }

    cleanSelectedCategories() {
        this.setDefaultParamsSearch();
        this.selectedCategories = undefined;
        this.getOffers(this.paginator, this.searchParams);
    }

    showModalFilter(typeFilter) {
        if (typeFilter === 'code') {
            this.displayCodeFilter = true;
            this.displayMoreFilters = false;
        }
        if (typeFilter === 'moreFilter') {
            this.displayMoreFilters = true;
            this.displayCodeFilter = false;
        }
        this.displayModalFilter = true;
    }

    setDefaultParamsSearch() {
        this.searchParams = {
            searchCode: null,
            searchProvince: null,
            searchCanton: null,
            searchPosition: null,
            searchIDs: null
        };
    }

    locationOut(event) {
        this.location = event;
        console.log(JSON.stringify(this.location));
    }
}
