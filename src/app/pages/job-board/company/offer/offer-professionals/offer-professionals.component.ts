import {Component, OnInit, Input} from '@angular/core';
import {Col} from '../../../../../models/setting/col';
import {Paginator} from '../../../../../models/setting/paginator';
import {JobBoardHttpService} from '../../../../../services/job-board/job-board-http.service';
import { Professional } from '../../../../../models/job-board/professional';

@Component({
    selector: 'app-offer-professionals',
    templateUrl: './offer-professionals.component.html',
    styleUrls: ['./offer-professionals.component.scss']
})

export class OfferProfessionalsComponent implements OnInit {
    @Input() flagProfessionals: boolean;
    @Input() professionalsIn: Professional[];
    @Input() paginatorIn: Paginator;
    colsProfessionals: Col[];

    constructor(private jobBoardHttpService: JobBoardHttpService) {
    }

    ngOnInit(): void {
        this.loadColsProfessionals();
    }

    loadColsProfessionals() {
        this.colsProfessionals = [
            {field: 'identification', header: 'Cédula'},
            {field: 'full_name', header: 'Nombres'},
            {field: 'email', header: 'Correo'},
        ];
    }

    contactProfessional(data){
        //this.jobBoardHttpService.applyProfessional();
        console.log(data);
    }
}