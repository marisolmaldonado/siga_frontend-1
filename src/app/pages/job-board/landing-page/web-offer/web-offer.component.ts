import {Component, OnInit} from '@angular/core';

// servicios
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from '../../../shared/services/message.service';
import {FormBuilder} from '@angular/forms';
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

    offers: Offer[];
    categories: Category[];
    auth: User;
    paginator: Paginator;
    treeData: any[];
    scrollHeight = '10px';
    selectedCategories: Category[];
    items: object[];
    displayModalFilter: boolean;
    searchParams: SearchParams = {
        searchCode: null,
        searchLocation: null,
        searchProvince: null,
        searchCanton: null,
        searchPosition: null,
        searchIDs: null
    };
    offerView: Offer;
    failSearchParams: SearchParams = {
        searchCode: null,
        searchLocation: null,
        searchProvince: null,
        searchCanton: null,
        searchPosition: null,
        searchIDs: null
    };

    constructor(private spinnerService: NgxSpinnerService,
                private messageService: MessageService,
                private authService: AuthService,
                private jobBoardHttpService: JobBoardHttpService) {
        this.auth = authService.getAuth();
        this.paginator = {
            per_page: 9,
            current_page: 1,
        };
    }

    ngOnInit() {
        this.getOffers(this.paginator, this.failSearchParams);
        this.getCategories();
        this.items = [
            {
                label: 'Más filtros', icon: 'pi pi-plus', command: () => {
                    this.showModalFilter();
                }
            },
        ];
    }

    getOffers(paginator: Paginator, searchParams: SearchParams) {
        const params = new HttpParams()
            .append('page', String(paginator.current_page))
            .append('per_page', String(paginator.per_page));
        const routeFilter = this.auth ? 'private-offers' : 'public-offers';
        console.log(routeFilter);
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

    pageChange(event): void {
        this.paginator.current_page = event.page + 1;
        this.getOffers(this.paginator, this.failSearchParams);
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
            for (const category of this.selectedCategories) {
                idsCategories.push(category.id);
            }
            this.searchParams.searchIDs = idsCategories;
            this.getOffers(this.paginator, this.searchParams);
        }
    }

    cleanSelectedCategories() {
        this.selectedCategories = undefined;
        this.getOffers(this.paginator, this.failSearchParams);
    }

    showModalFilter() {
        this.displayModalFilter = true;
    }
}

