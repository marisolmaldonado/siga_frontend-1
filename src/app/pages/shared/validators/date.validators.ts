import {FormControl, ValidationErrors} from '@angular/forms';
import * as moment from 'moment';

export class DateValidators {
    static valid(control: FormControl): ValidationErrors {
        const value = control.value;
        const isValid = value ? moment(value).isValid() : true;
        return isValid ? null : {valid: true};
    }

    static max(maxDate: string): (control: FormControl) => ValidationErrors {
        return (control: FormControl): ValidationErrors => {
            const max = moment(maxDate);
            const value = control.value;
            const isValid = value ? moment(value).isBefore(max) : true;
            return isValid ? null : {max: true};
        };
    }
}
