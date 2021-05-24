import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from '../../../shared/services/breadcrumb.service';

@Component({
    selector: 'app-professional',
    templateUrl: './professional.component.html',
    styleUrls: ['./professional.component.css']
})
export class ProfessionalComponent implements OnInit {

    constructor(private breadcrumbService: BreadcrumbService) {
        this.breadcrumbService.setItems([
            {label: 'Dashboard', routerLink: ['/dashboard']},
            {label: 'Profesional'}
        ]);
    }

    ngOnInit(): void {

    }

}
