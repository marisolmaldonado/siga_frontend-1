import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {Address} from '../../../../models/app/address';
import {AppHttpService} from '../../../../services/app/app-http.service';
import {HttpParams} from '@angular/common/http';
import {Catalogue} from '../../../../models/app/catalogue';
import {MessageService} from '../../../../services/app/message.service';

@Component({
    selector: 'app-location-address',
    templateUrl: './location-address.component.html',
    styleUrls: ['./location-address.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => LocationAddressComponent),
            multi: true
        }
    ]
})

export class LocationAddressComponent implements OnInit, ControlValueAccessor {
    formAddress: FormGroup;
    value: Address;
    onChange: (value: Address) => void;
    onTouch: () => void;
    isDisabled: boolean;
    sectors: Catalogue[];

    constructor(private formBuilder: FormBuilder, private appHttpService: AppHttpService, private messageService: MessageService) {

    }

    ngOnInit(): void {
        this.buildFormAddress();
        this.getSectors();
    }

    buildFormAddress() {
        this.formAddress = this.formBuilder.group({
            main_street: [null, Validators.required],
            secondary_street: [null, Validators.required],
            number: [null],
            post_code: [null],
            sector: [null, Validators.required],
            reference: [null],
            latitude: [null],
            longitude: [null]
        });
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    writeValue(value: Address): void {
        this.value = value;
        if (this.value) {
            this.formAddress.patchValue(this.value);
        }
    }

    updateValue(): void {
        if (this.formAddress.valid) {
            this.value = this.formAddress.value;
            this.onChange(this.value);
        }
    }

    getSectors() {
        const params = new HttpParams().append('type', 'SECTOR');
        this.appHttpService.getCatalogues(params).subscribe(response => {
            this.sectors = response['data'];
        }, error => {
            this.messageService.error(error);
        });
    }

    get mainStreetField() {
        return this.formAddress.get('main_street');
    }

    get secondaryStreet() {
        return this.formAddress.get('secondary_street');
    }

    get numberField() {
        return this.formAddress.get('number');
    }

    get postCodeField() {
        return this.formAddress.get('post_code');
    }

    get sectorField() {
        return this.formAddress.get('sector');
    }

    get referenceField() {
        return this.formAddress.get('reference');
    }

    get latitudeField() {
        return this.formAddress.get('latitude');
    }

    get longitudeField() {
        return this.formAddress.get('longitude');
    }
}
