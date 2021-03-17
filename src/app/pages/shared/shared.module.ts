// Angular Modules
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

// PrimeNG Modules
import {DropdownModule} from 'primeng/dropdown';
import {ConfirmationService, MessageService} from 'primeng/api';
import {DateComponent} from "./components/date/date.component";
import { MonthsPipe } from './pipes/months.pipe';
import {LocationAddressComponent} from "./components/location-address/location-address.component";

// My Components
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DropdownModule,
    ],
    declarations: [
        DateComponent,
        LocationAddressComponent,
        MonthsPipe
    ],
    exports: [DateComponent,LocationAddressComponent],
    providers: [ConfirmationService, MessageService]
})
export class SharedModule {
}
