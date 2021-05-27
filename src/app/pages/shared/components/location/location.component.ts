<<<<<<< HEAD
<<<<<<< HEAD
import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {AppHttpService} from '../../../../services/app/app-http.service';
import {Location} from '../../../../models/app/location';
import {MessageService} from 'primeng/api';
=======
=======
>>>>>>> u_6_faz-evelyn
import {Component, forwardRef, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {AppHttpService} from '../../../../services/app/app-http.service';
import {Location} from '../../../../models/app/location';
import {MessageService as MessagePnService} from 'primeng/api';
import {MessageService} from '../../services/message.service';
import {SharedService} from '../../services/shared.service';
<<<<<<< HEAD
>>>>>>> mod_6_jobboard
=======
>>>>>>> u_6_faz-evelyn

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
<<<<<<< HEAD
<<<<<<< HEAD
=======
    @Output() formLocationOut = new EventEmitter<FormGroup>();
>>>>>>> mod_6_jobboard
=======
    @Output() formLocationOut = new EventEmitter<FormGroup>();
>>>>>>> u_6_faz-evelyn
    formLocation: FormGroup;
    countries: Location[];
    provinces: Location[];
    cantons: Location[];
    parishes: Location[];
<<<<<<< HEAD
<<<<<<< HEAD
    value: string;
    onChange: (value: string) => void;
=======
    value: Location;
    onChange: (value: Location) => void;
>>>>>>> mod_6_jobboard
=======
    value: Location;
    onChange: (value: Location) => void;
>>>>>>> u_6_faz-evelyn
    onTouch: () => void;
    isDisabled: boolean;
    filteredCountries: any[];
    filteredProvinces: any[];
    filteredCantons: any[];
    filteredParishes: any[];

    constructor(private formBuilder: FormBuilder,
                private appHttpService: AppHttpService,
                private sharedService: SharedService,
                private messagePnService: MessagePnService,
                private messageService: MessageService) {
        this.countries = [];
        this.provinces = [];
        this.cantons = [];
        this.parishes = [];
        this.option = 4;
    }

    ngOnInit(): void {
<<<<<<< HEAD
<<<<<<< HEAD
        this.buildForm();
        this.getLocations();
    }

    buildForm() {
=======
        this.buildFormLocation();
        this.getLocations();
    }

    buildFormLocation() {
>>>>>>> mod_6_jobboard
=======
        this.buildFormLocation();
        this.getLocations();
    }

    buildFormLocation() {
>>>>>>> u_6_faz-evelyn
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
<<<<<<< HEAD
<<<<<<< HEAD
    }

    getLocations() {
        this.appService.getLocations().subscribe(response => {
=======
        this.formLocationOut.emit(this.formLocation);
    }

    getLocations() {
        this.appHttpService.getLocations().subscribe(response => {
>>>>>>> mod_6_jobboard
=======
        this.formLocationOut.emit(this.formLocation);
    }

    getLocations() {
        this.appHttpService.getLocations().subscribe(response => {
>>>>>>> u_6_faz-evelyn
            this.countries = response['data'];
        }, error => {
            this.messageService.error(error);
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
            this.messagePnService.clear();
            this.messagePnService.add({
                severity: 'error',
<<<<<<< HEAD
<<<<<<< HEAD
                summary: 'No existen paises disponibles',
                detail: 'Por favor escriba el nombre!'
=======
                summary: 'Por favor seleccione un país del listado',
                detail: 'En el caso de no existir comuníquese con el administrador!',
                life: 5000
>>>>>>> mod_6_jobboard
=======
                summary: 'Por favor seleccione un país del listado',
                detail: 'En el caso de no existir comuníquese con el administrador!',
                life: 5000
>>>>>>> u_6_faz-evelyn
            });
            this.countryField.setValue(null);
        }

        this.filteredCountries = filtered;
    }

    filterProvince(event) {
        const filtered: any[] = [];
        const query = event.query;

        for (const province of this.provinces) {
            if (province.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(province);
            }
        }

        if (filtered.length === 0) {
            this.messagePnService.clear();
            this.messagePnService.add({
                severity: 'error',
                summary: 'Por favor seleccione una provincia del listado',
                detail: 'En el caso de no existir comuníquese con el administrador!',
                life: 5000
            });
            this.provinceField.setValue(null);
        }

        this.filteredProvinces = filtered;
    }

    filterCanton(event) {
        const filtered: any[] = [];
        const query = event.query;

        for (const canton of this.cantons) {
            if (canton.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(canton);
            }
        }

        if (filtered.length === 0) {
            this.messagePnService.clear();
            this.messagePnService.add({
                severity: 'error',
                summary: 'Por favor seleccione un cantón del listado',
                detail: 'En el caso de no existir comuníquese con el administrador!',
                life: 5000
            });
            this.cantonField.setValue(null);
        }

        this.filteredCantons = filtered;
    }

    filterParish(event) {
        const filtered: any[] = [];
        const query = event.query;
<<<<<<< HEAD
<<<<<<< HEAD
        if (this.parishes.length === 0 && !this.parishField.value) {
            this.messageService.add({
                severity: 'info',
                summary: 'No existen parroquias disponibles',
                detail: 'Por favor ingrese una!'
            });
        }
=======

>>>>>>> mod_6_jobboard
=======

>>>>>>> u_6_faz-evelyn
        for (const parish of this.parishes) {
            if (parish.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(parish);
            }
        }

        if (filtered.length === 0) {
            this.messagePnService.clear();
            this.messagePnService.add({
                severity: 'error',
                summary: 'Por favor seleccione una parroquia del listado',
                detail: 'En el caso de no existir comuníquese con el administrador!',
                life: 5000
            });
            this.parishField.setValue(null);
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

    writeValue(value: Location): void {
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
<<<<<<< HEAD
<<<<<<< HEAD
        if (this.formLocation.valid) {
            this.value = field.value.id;
=======
        if (this.formLocation.valid && field.value?.id) {
            this.value = {id: field.value.id};
>>>>>>> mod_6_jobboard
=======
        if (this.formLocation.valid && field.value?.id) {
            this.value = {id: field.value.id};
>>>>>>> u_6_faz-evelyn
            this.onChange(this.value);
            // this.formLocationOut.emit(this.formLocation);
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
