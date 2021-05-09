import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators} from "@angular/forms";
import {MessageService} from 'primeng/api';
import {Address} from '../../../../models/app/models.index';
import {AppService} from '../../../../services/app/app.service';

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
    main_street: FormControl;
    secondary_street: FormControl;
    number: FormControl;
    post_code: FormControl;
    sector: FormControl;
    indications: FormControl;
    latitude: FormControl;
    longitude: FormControl;
    value: Address;
    onChange: (value: Address) => void;
    onTouch: () => void;
    isDisabled: boolean;

    constructor(private _formBuilder: FormBuilder, private _appService: AppService, private _messageService: MessageService) {

    }

    ngOnInit(): void {
        this.buildFormAddress();
    }

    buildFormAddress() {
        this.formAddress = this._formBuilder.group({
            'main_street': ['', Validators.required],
            'secondary_street': ['', Validators.required],
            'number': [null],
            'post_code': [null],
            'sector': ['',Validators.required],
            'indications': [null],
            'latitude': [null],
            'longitude': [null]
        });
        /*
        this.main_street = this._formBuilder.control('', Validators.required);
        this.secondary_street = this._formBuilder.control('', Validators.required);
        this.number = this._formBuilder.control('', Validators.required);
        this.post_code = this._formBuilder.control('', Validators.required);
        this.sector = this._formBuilder.control('', Validators.required);
        this.indications = this._formBuilder.control('', Validators.required);
        this.latitude = this._formBuilder.control('', Validators.required);
        this.longitude = this._formBuilder.control('', Validators.required);
        */
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
        console.log(value);
        this.value = value;
        if (this.value) {
            /*
            this.main_street.setValue(this.value.main_street);
            this.secondary_street.setValue(this.value.secondary_street);
            this.number.setValue(this.value.main_street);
            this.post_code.setValue(this.value.main_street);
            this.sector.setValue(this.value.main_street);
            this.indications.setValue(this.value.indications);
            this.latitude.setValue(this.value.main_street);
            this.longitude.setValue(this.value.main_street);
             */
            this.formAddress.patchValue(this.value);
        }
    }

    updateValue(): void {
        console.log(this.value);
        if (this.formAddress.valid) {
            this.value = this.formAddress.value;
            this.onChange(this.value);
        }
    }
}
