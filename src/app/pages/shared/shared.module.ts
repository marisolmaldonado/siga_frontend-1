// Angular Modules
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

// PrimeNG Modules
import {DropdownModule} from 'primeng/dropdown';
import {ConfirmationService, MessageService} from 'primeng/api';
import {DateComponent} from "./components/date/date.component";
import { MonthsPipe } from './pipes/months.pipe';
import {LocationAddressComponent} from "./components/location-address/location-address.component";
import {LocationComponent} from "./components/location/location.component";
import {AutoCompleteModule} from "primeng/autocomplete";
import {ToastModule} from "primeng/toast";

// My Components
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DropdownModule,
        AutoCompleteModule,
        ToastModule,
    ],
    declarations: [
        DateComponent,
        LocationAddressComponent,
        LocationComponent,
        MonthsPipe
    ],
    exports: [DateComponent,LocationComponent,LocationAddressComponent],
    providers: [ConfirmationService, MessageService]
})
export class SharedModule {
}
