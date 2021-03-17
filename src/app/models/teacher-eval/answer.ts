import {State} from '../app/models.index';
import {Catalogue} from '../app/models.index';

export interface Answer {
    id?: number;
    code?: string;
    order?: string;
    name?: string;
    value?: string;
    status?: Catalogue;
}
