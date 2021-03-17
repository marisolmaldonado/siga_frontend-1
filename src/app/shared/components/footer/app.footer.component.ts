import {Component} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {System} from "../../../models/auth/models.index";
import {Institution} from "../../../models/app/institution";

@Component({
    selector: 'app-footer',
    templateUrl: 'app.footer.component.html'
})
export class AppFooterComponent {
    institution: Institution;
    system: System;
    STORAGE_URL: string;

    constructor() {
        this.institution = JSON.parse(localStorage.getItem('institution'));
        this.STORAGE_URL = environment.STORAGE_URL;
        this.system = JSON.parse(localStorage.getItem('system'));
    }
}
