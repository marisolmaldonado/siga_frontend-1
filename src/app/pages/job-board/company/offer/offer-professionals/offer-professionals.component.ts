import {Component, OnInit, Input} from '@angular/core';
import {Col} from '../../../../../models/setting/col';
import {Paginator} from '../../../../../models/setting/paginator';
import { Professional } from '../../../../../models/job-board/professional';

@Component({
    selector: 'app-offer-professionals',
    templateUrl: './offer-professionals.component.html',
    styleUrls: ['./offer-professionals.component.scss']
})

export class OfferProfessionalsComponent implements OnInit {
    @Input() professionalsIn: Professional[];
    @Input() paginatorIn: Paginator;
    colsProfessionals: Col[];

    constructor() {
    }

    ngOnInit(): void {
        this.loadColsProfessionals();
    }

    loadColsProfessionals() {
        this.colsProfessionals = [
            {field: 'identification', header: 'Cédula'},
            {field: 'full_name', header: 'Nombres'},
            {field: 'full_lastname', header: 'Apellidos'},
            {field: 'email', header: 'Correo'},
        ];
    }

    test(){
        console.log(this.professionalsIn);
    }
}