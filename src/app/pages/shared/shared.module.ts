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
import {ChatComponent} from './components/chat/chat.component';
import { UserListComponent } from './components/chat/user-list/user-list.component';
import { ChatBodyComponent } from './components/chat/chat-body/chat-body.component';
import {ButtonModule} from "primeng/button";
import {PanelModule} from "primeng/panel";
import {InputTextModule} from "primeng/inputtext";
import {HttpClientModule} from "@angular/common/http";
import {VirtualScrollerModule} from "primeng/virtualscroller";
import {ScrollPanelModule} from "primeng/scrollpanel";
import {MessageModule} from "primeng/message";
import {AvatarModule} from "primeng/avatar";
import {OrderListModule} from "primeng/orderlist";
import {MessagesModule} from "primeng/messages";

// My Components
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        DropdownModule,
        AutoCompleteModule,
        ToastModule,
        ButtonModule,
        PanelModule,
        InputTextModule,
        VirtualScrollerModule,
        ScrollPanelModule,
        MessageModule,
        AvatarModule,
        OrderListModule,
        MessagesModule,
    ],
    declarations: [
        DateComponent,
        LocationAddressComponent,
        LocationComponent,
        MonthsPipe,
        ChatComponent,
        UserListComponent,
        ChatBodyComponent
    ],
    exports: [DateComponent, LocationComponent, LocationAddressComponent, ChatComponent],
    providers: [ConfirmationService, MessageService]
})
export class SharedModule {
}
