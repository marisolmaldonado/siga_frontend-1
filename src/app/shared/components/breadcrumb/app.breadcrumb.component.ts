import {Component, OnDestroy} from '@angular/core';
import {BreadcrumbService} from '../../services/breadcrumb.service';
import {Subscription} from 'rxjs';
import {MenuItem} from 'primeng/api';
import {User} from '../../../models/auth/user';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './app.breadcrumb.component.html'
})
export class AppBreadcrumbComponent implements OnDestroy {
    subscription: Subscription;
    items: MenuItem[];
    user: User;

    constructor(public breadcrumbService: BreadcrumbService) {
        this.subscription = breadcrumbService.itemsHandler.subscribe(response => {
            this.items = response as MenuItem[];
        });
        this.user = JSON.parse(localStorage.getItem('user')) as User;
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
