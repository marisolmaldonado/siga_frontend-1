import {Component, forwardRef, OnInit} from '@angular/core';
import {HttpParams} from "@angular/common/http";
import {ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators} from "@angular/forms";
import {AppService} from "../../../../services/app/app.service";
import {Location} from "../../../../models/app/location";
import {MessageService} from "primeng/api";


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
    locations: Location[];
    countries: Location[];
    country: FormControl;
    provinces: Location[];
    province: FormControl;
    cantons: Location[];
    canton: FormControl;
    parishes: Location[];
    parish: FormControl;
    value: string;
    onChange: (value: string) => void;
    onTouch: () => void;
    isDisabled: boolean;
    filteredCountries: any[];
    filteredProvinces: any[];
    filteredCantons: any[];
    filteredParishes: any[];

    constructor(private _formBuilder: FormBuilder, private _appService: AppService, private _messageService: MessageService) {
        this.countries = [];
        this.provinces = [];
        this.cantons = [];
        this.parishes = [];
    }

    ngOnInit(): void {
        this.buildFormDate();
        this.getCountries();
        this.getLocations();
    }

    buildFormDate() {
        this.country = this._formBuilder.control('', Validators.required);
        this.province = this._formBuilder.control('', Validators.required);
        this.canton = this._formBuilder.control('', Validators.required);
        this.parish = this._formBuilder.control('', Validators.required);
    }

    getLocations() {
        const params = new HttpParams().append('id', 'ETHNIC_ORIGIN_TYPE');
        this._appService.getLocations(params).subscribe(response => {
            this.locations = response['data'];
            let catalogues = [];
            for (let i in this.locations) {
                if (catalogues.indexOf(this.locations[i].type.id) === -1) {
                    catalogues.push(this.locations[i]);
                }
            }
            this.countries = this.locations.filter(element => element.type)
        });
    }

    getCountries() {
        this._appService.getCountries().subscribe(response => {
            this.countries = response['data'];
            console.log(this.countries);
        });
    }

    loadProvinces() {
        this.provinces = this.locations.find(element => element.id === this.country.value.id)['children'];
    }

    loadCantons() {
        this.cantons = this.provinces.find(element => element.id === this.province.value.id)['children'];
    }

    loadParishes() {
        this.parishes = this.cantons.find(element => element.id === this.canton.value.id)['children'];
    }

    filterCountry(event) {
        let filtered: any[] = [];
        let query = event.query;
        for (let i = 0; i < this.countries.length; i++) {
            let country = this.countries[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        if (filtered.length === 0) {
            this._messageService.add({
                severity: 'error',
                summary: 'No existen paises disponibles',
                detail: 'Comuníquese con el administrador!'
            });
        }
        this.filteredCountries = filtered;
    }

    filterProvince(event) {
        let filtered: any[] = [];
        let query = event.query;
        if (this.provinces.length === 0) {
            this._messageService.add({
                severity: 'error',
                summary: 'No existen provincias disponibles',
                detail: 'Comuníquese con el administrador!'
            });
        }
        for (let i = 0; i < this.provinces.length; i++) {
            let province = this.provinces[i];
            if (province.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(province);
            }
        }

        this.filteredProvinces = filtered;
    }

    filterCanton(event) {
        let filtered: any[] = [];
        let query = event.query;
        if (this.cantons.length === 0) {
            this._messageService.add({
                severity: 'error',
                summary: 'No existen cantones disponibles',
                detail: 'Comuníquese con el administrador!'
            });
        }
        for (let i = 0; i < this.cantons.length; i++) {
            let canton = this.cantons[i];
            if (canton.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(canton);
            }
        }

        this.filteredCantons = filtered;
    }

    filterParish(event) {
        let filtered: any[] = [];
        if (this.parishes.length === 0) {
            this._messageService.add({
                severity: 'error',
                summary: 'No existen parroquias disponibles',
                detail: 'Comuníquese con el administrador!'
            });
        }
        let query = event.query;
        for (let i = 0; i < this.parishes.length; i++) {
            let parish = this.parishes[i];
            if (parish.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
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
        if (this.value) {
            this.parish.setValue(this.value);
        }
    }

    updateValue(): void {
        console.log(this.parish);
        if (this.country.valid && this.province.valid && this.canton.valid, this.parish.valid) {
            this.value = this.parish.value.id
            this.onChange(this.value);
        }
    }
}
