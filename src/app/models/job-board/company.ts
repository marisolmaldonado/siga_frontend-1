
import {Professional} from './professional';
import {Catalogue} from '../app/catalogue';
import { Address } from '../app/address';
import { Status } from '../app/status';
import { User } from '../auth/user';


export interface Company {
    id?: number;
    trade_name?:string;
    prefix?:string;
    comercial_activities?:string[];
    web?:string;
    professionals?: Professional;
    pivot?: Pivot;
    type?: Catalogue;
    identficationType?:Catalogue;
    activityType?:Catalogue;
    personType?:Catalogue;
    address?:Address;
    status?:Status;
    user?:User;

}
export interface Pivot {
    company_id: number;
    professional_id: number;
    created_at: string;
    updated_at: string;
}
