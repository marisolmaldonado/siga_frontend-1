import {Catalogue} from '../app/catalogue';
import {Location} from '../app/location';
import {Status} from '../app/status';
import {Company} from './company';

export interface Offer {
    id?: number;
    vacancies?: number;
    code?: string;
    description?: string;
    aditional_information?: string;
    contact_name?: string;
    contact_email?: string;
    contact_phone?: string;
    contact_cellphone?: string;
    remuneration?: string;
    contract_type?: Catalogue;
    position?: Catalogue;
    sector?: Catalogue;
    working_day?: Catalogue;
    experience_time?: Catalogue;
    training_hours?: Catalogue;
    location?: Location; 
    company?: Company;
    status?: Status;
    start_date?: Date;
    end_date?: Date;
    activities?: string[];
    requirements?: string[];    
}
