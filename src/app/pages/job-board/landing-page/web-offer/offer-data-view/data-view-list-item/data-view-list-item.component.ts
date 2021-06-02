import {Component, EventEmitter, Host, Input, OnInit, Output} from '@angular/core';
import {Inplace} from 'primeng/inplace';
import {Offer} from '../../../../../../models/job-board/offer';
import {HttpParams} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from '../../../../../shared/services/message.service';
import {AuthService} from '../../../../../../services/auth/auth.service';
import {JobBoardHttpService} from '../../../../../../services/job-board/job-board-http.service';
import {OfferDataViewComponent} from '../offer-data-view.component';
import {User} from '../../../../../../models/auth/user';

@Component({
    selector: 'app-data-view-list-item',
    templateUrl: './data-view-list-item.component.html',
    styleUrls: ['./data-view-list-item.component.scss']
})
export class DataViewListItemComponent implements OnInit {

    @Input() offer: Offer;
    @Output() idOffer = new EventEmitter<string>();
    displayButtonApply: boolean;
    auth: User;

    constructor(private authService: AuthService) {
        this.auth = authService.getAuth();
        this.auth ? this.displayButtonApply = true : this.displayButtonApply = false;
    }

    ngOnInit(): void {

    }

    sendIdOffer(id: number) {
        this.idOffer.emit(id.toString())   ;
    }

}
