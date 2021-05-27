<<<<<<< HEAD
<<<<<<< HEAD
import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
=======
=======
>>>>>>> u_6_faz-evelyn
import {
    Component,
    EventEmitter,
    forwardRef,
    Input,
    OnInit,
    Output
} from '@angular/core';
import {ControlValueAccessor, Form, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
<<<<<<< HEAD
>>>>>>> mod_6_jobboard
=======
>>>>>>> u_6_faz-evelyn
import {Address} from '../../../../models/app/address';
import {AppHttpService} from '../../../../services/app/app-http.service';
import {HttpParams} from '@angular/common/http';
import {Catalogue} from '../../../../models/app/catalogue';
<<<<<<< HEAD
<<<<<<< HEAD
import {MessageService} from '../../../../services/app/message.service';
=======
import {MessageService} from '../../services/message.service';
import {SharedService} from '../../services/shared.service';
>>>>>>> mod_6_jobboard
=======
import {MessageService} from '../../services/message.service';
import {SharedService} from '../../services/shared.service';
>>>>>>> u_6_faz-evelyn

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
<<<<<<< HEAD
    constructor(private formBuilder: FormBuilder, private appHttpService: AppHttpService, private messageService: MessageService) {
=======
=======
>>>>>>> u_6_faz-evelyn
    constructor(private formBuilder: FormBuilder,
                private appHttpService: AppHttpService,
                private sharedService: SharedService,
                private messageService: MessageService) {
<<<<<<< HEAD
>>>>>>> mod_6_jobboard
=======
>>>>>>> u_6_faz-evelyn

    }

    ngOnInit(): void {
        this.getSectors();
        this.buildFormAddress();
<<<<<<< HEAD
<<<<<<< HEAD
        this.getSectors();
=======
        this.formAddressOut.emit(this.formAddress);
>>>>>>> mod_6_jobboard
=======
        this.formAddressOut.emit(this.formAddress);
>>>>>>> u_6_faz-evelyn
    }

    buildFormAddress() {
        this.formAddress = this.formBuilder.group({
<<<<<<< HEAD
<<<<<<< HEAD
=======
            location: [null, Validators.required],
>>>>>>> mod_6_jobboard
=======
            location: [null, Validators.required],
>>>>>>> u_6_faz-evelyn
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
<<<<<<< HEAD
=======
=======
>>>>>>> u_6_faz-evelyn

    emitFormLocation(event) {
        console.log(event);
        this.formLocationOut.emit(event);
    }
<<<<<<< HEAD
>>>>>>> mod_6_jobboard
=======
>>>>>>> u_6_faz-evelyn
}
