import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'months'
})
export class MonthsPipe implements PipeTransform {

    transform(value: string, ...args: unknown[]): unknown {
        switch (value) {
            case '01':
                return 'ENERO';

            case '02':
                return 'FEBRERO';

            case '03':
                return 'MARZO';

            case '04':
                return 'ABRIL';

            case '05':
                return 'MAYO';

            case '06':
                return 'JUNIO';

            case '07':
                return 'JULIO';

            case '08':
                return 'AGOSTO';

            case '09':
                return 'SEPTIEMBRE';

            case '10':
                return 'OCTUBRE';

            case '11':
                return 'NOVIEMBRE';

            case '12':
                return 'DICIEMBRE';

            default:
                return 'SN';
        }
    }

}
