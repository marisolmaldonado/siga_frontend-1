import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {AppHttpService} from '../../../../services/app/app-http.service';
import {Location} from '../../../../models/app/location';
import {MessageService} from 'primeng/api';

@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => LocationComponent),
            multi: true
        }
    ]
})

export class LocationComponent implements OnInit, ControlValueAccessor {
    @Input() option: number;
    formLocation: FormGroup;
    countries: Location[];
    provinces: Location[];
    cantons: Location[];
    parishes: Location[];
    value: string;
    onChange: (value: string) => void;
    onTouch: () => void;
    isDisabled: boolean;
    filteredCountries: any[];
    filteredProvinces: any[];
    filteredCantons: any[];
    filteredParishes: any[];

    constructor(private formBuilder: FormBuilder, private appService: AppHttpService, private messageService: MessageService) {
        this.countries = [];
        this.provinces = [];
        this.cantons = [];
        this.parishes = [];
    }

    ngOnInit(): void {
        this.buildForm();
        this.getLocations();
    }

    buildForm() {
        this.formLocation = this.formBuilder.group({
            country: [null, Validators.required],
            province: [null, Validators.required],
            canton: [null, Validators.required],
            parish: [null, Validators.required],
        });
        switch (this.option) {
            case 1:
                this.provinceField.setValidators(null);
                this.cantonField.setValidators(null);
                this.parishField.setValidators(null);
                break;
            case 2:
                this.cantonField.setValidators(null);
                this.parishField.setValidators(null);
                break;
            case 3:
                this.parishField.setValidators(null);
                break;
        }
    }

    getLocations() {
        this.appService.getLocations().subscribe(response => {
            this.countries = response['data'];
        });
    }

    loadProvinces() {
        this.provinces = this.countries.find(element => element.id === this.countryField.value.id)['children'];
    }

    loadCantons() {
        this.cantons = this.provinces.find(element => element.id === this.provinceField.value.id)['children'];
    }

    loadParishes() {
        this.parishes = this.cantons.find(element => element.id === this.cantonField.value.id)['children'];
    }

    filterCountry(event) {
        const filtered: any[] = [];
        const query = event.query;
        for (const country of this.countries) {
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(country);
            }
        }

        if (filtered.length === 0) {
            this.messageService.add({
                severity: 'error',
                summary: 'No existen paises disponibles',
                detail: 'Por favor escriba el nombre!'
            });
        }
        this.filteredCountries = filtered;
    }

    filterProvince(event) {
        const filtered: any[] = [];
        const query = event.query;
        if (this.provinces.length === 0) {
            this.messageService.add({
                severity: 'error',
                summary: 'No existen provincias disponibles',
                detail: 'Comuníquese con el administrador!'
            });
        }
        for (const province of this.provinces) {
            if (province.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(province);
            }
        }

        this.filteredProvinces = filtered;
    }

    filterCanton(event) {
        const filtered: any[] = [];
        const query = event.query;
        if (this.cantons.length === 0) {
            this.messageService.add({
                severity: 'error',
                summary: 'No existen cantones disponibles',
                detail: 'Comuníquese con el administrador!'
            });
        }
        for (const canton of this.cantons) {
            if (canton.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(canton);
            }
        }

        this.filteredCantons = filtered;
    }

    filterParish(event) {
        const filtered: any[] = [];
        const query = event.query;
        if (this.parishes.length === 0 && !this.parishField.value) {
            this.messageService.add({
                severity: 'info',
                summary: 'No existen parroquias disponibles',
                detail: 'Por favor ingrese una!'
            });
        }
        for (const parish of this.parishes) {
            if (parish.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(parish);
            }
        }
        this.filteredParishes = filtered;
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

    writeValue(value: string): void {
        this.value = value;
        switch (this.option) {
            case 1:
                this.countryField.setValue(value);
                break;
            case 2:
                this.provinceField.setValue(value);
                break;
            case 3:
                this.cantonField.setValue(value);
                break;
            case 4:
                this.parishField.setValue(value);
                break;
        }
    }

    updateValue(field): void {
        if (this.formLocation.valid) {
            this.value = field.value.id;
            this.onChange(this.value);
        }
    }

    get countryField() {
        return this.formLocation.get('country');
    }

    get provinceField() {
        return this.formLocation.get('province');
    }

    get cantonField() {
        return this.formLocation.get('canton');
    }

    get parishField() {
        return this.formLocation.get('parish');
    }
}
