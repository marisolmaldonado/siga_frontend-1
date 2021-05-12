// Angular Modules
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

// PrimeNG Modules
import {DropdownModule} from 'primeng/dropdown';
import {ConfirmationService, MessageService} from 'primeng/api';
import {DateComponent} from "./components/date/date.component";
import {MonthsPipe} from './pipes/months.pipe';
import {LocationAddressComponent} from "./components/location-address/location-address.component";
import {LocationComponent} from "./components/location/location.component";
import {AutoCompleteModule} from "primeng/autocomplete";
import {ToastModule} from "primeng/toast";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ButtonModule} from "primeng/button";
import {FieldsetModule} from "primeng/fieldset";
import {TooltipModule} from "primeng/tooltip";

// My Components
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DropdownModule,
        AutoCompleteModule,
        ToastModule,
        InputTextModule,
        InputTextareaModule,
        ButtonModule,
        FieldsetModule,
        TooltipModule,
    ],
    declarations: [
        DateComponent,
        LocationAddressComponent,
        LocationComponent,
        MonthsPipe
    ],
    exports: [DateComponent, LocationComponent, LocationAddressComponent],
    providers: []
})
export class SharedModule {
}
