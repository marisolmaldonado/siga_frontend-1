
import {Professional} from './professional';
export interface Company {
    id?: number;
    trade_name?:string;
    comercial_activities?:string;
    web?:string;
    professional?: Professional;
}
