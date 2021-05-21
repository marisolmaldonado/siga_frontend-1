// Angular Modules
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

// PrimeNG Modules
import {DropdownModule} from 'primeng/dropdown';
import {ConfirmationService, MessageService} from 'primeng/api';
import {DateComponent} from './components/date/date.component';
import {MonthsPipe} from './pipes/months.pipe';
import {LocationAddressComponent} from './components/location-address/location-address.component';
import {LocationComponent} from './components/location/location.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {ToastModule} from 'primeng/toast';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ButtonModule} from 'primeng/button';
import {FieldsetModule} from 'primeng/fieldset';
import {TooltipModule} from 'primeng/tooltip';
import {SkeletonComponent} from './components/skeleton/skeleton.component';
import {SkeletonModule} from 'primeng/skeleton';
import {UploadFilesComponent} from './components/upload-files/upload-files.component';
import {FileUploadModule} from 'primeng/fileupload';
import {ViewFilesComponent} from './components/view-files/view-files.component';
import {TableModule} from 'primeng/table';
import {RippleModule} from 'primeng/ripple';
import {PaginatorModule} from 'primeng/paginator';
import {ToolbarModule} from 'primeng/toolbar';
import { ExtensionsPipe } from './pipes/extensions.pipe';
import {RadioButtonModule} from "primeng/radiobutton";

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
        SkeletonModule,
        FileUploadModule,
        TableModule,
        RippleModule,
        PaginatorModule,
        ToolbarModule,
        RadioButtonModule,
    ],
    declarations: [
        DateComponent,
        LocationAddressComponent,
        LocationComponent,
        MonthsPipe,
        SkeletonComponent,
        UploadFilesComponent,
        ViewFilesComponent,
        ExtensionsPipe
    ],
    exports: [DateComponent,
        LocationComponent,
        LocationAddressComponent,
        SkeletonComponent,
        UploadFilesComponent,
        ViewFilesComponent,
    ],
    providers: [ConfirmationService, MessageService]
})
export class SharedModule {
}
