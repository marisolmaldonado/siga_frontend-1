import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Offer} from '../../../../../../models/job-board/offer';
import {HttpParams} from '@angular/common/http';
import {AuthService} from '../../../../../../services/auth/auth.service';
import {User} from '../../../../../../models/auth/user';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-data-view-grid-item',
    templateUrl: './data-view-grid-item.component.html',
    styleUrls: ['./data-view-grid-item.component.scss']
})
export class DataViewGridItemComponent implements OnInit {

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
