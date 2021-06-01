import { Professional } from './professional';
import { Catalogue } from '../app/catalogue';

export interface Reference {
    id?: number;
    professional?: Professional;
    institution?: Catalogue;
    position?: string;
    contact_name?: string;
    contact_phone?: string;
    contact_email?: string;
}
