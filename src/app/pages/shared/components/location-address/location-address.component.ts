<<<<<<< HEAD
import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
=======
import {
    Component,
    EventEmitter,
    forwardRef,
    Input,
    OnInit,
    Output
} from '@angular/core';
import {ControlValueAccessor, Form, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
>>>>>>> mod_6_jobboard
import {Address} from '../../../../models/app/address';
import {AppHttpService} from '../../../../services/app/app-http.service';
import {HttpParams} from '@angular/common/http';
import {Catalogue} from '../../../../models/app/catalogue';
<<<<<<< HEAD
import {MessageService} from '../../../../services/app/message.service';
=======
import {MessageService} from '../../services/message.service';
import {SharedService} from '../../services/shared.service';
>>>>>>> mod_6_jobboard

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
    @Input() option: number;
    @Output() formAddressOut = new EventEmitter<FormGroup>();
    @Output() formLocationOut = new EventEmitter<FormGroup>();
    formAddress: FormGroup;
    value: Address;
    onChange: (value: Address) => void;
    onTouch: () => void;
    isDisabled: boolean;
    sectors: Catalogue[];

<<<<<<< HEAD
    constructor(private formBuilder: FormBuilder, private appHttpService: AppHttpService, private messageService: MessageService) {
=======
    constructor(private formBuilder: FormBuilder,
                private appHttpService: AppHttpService,
                private sharedService: SharedService,
                private messageService: MessageService) {
>>>>>>> mod_6_jobboard

    }

    ngOnInit(): void {
        this.getSectors();
        this.buildFormAddress();
<<<<<<< HEAD
        this.getSectors();
=======
        this.formAddressOut.emit(this.formAddress);
>>>>>>> mod_6_jobboard
    }

    buildFormAddress() {
        this.formAddress = this.formBuilder.group({
<<<<<<< HEAD
=======
            location: [null, Validators.required],
>>>>>>> mod_6_jobboard
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
            this.formAddressOut.emit(this.formAddress);
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
<<<<<<< HEAD
=======

    emitFormLocation(event) {
        console.log(event);
        this.formLocationOut.emit(event);
    }
>>>>>>> mod_6_jobboard
}
