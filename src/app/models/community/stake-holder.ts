import {Catalogue, State} from '../app/models.index';

export interface StakeHolder {
    id?:number;
    name?: string;
    lastname?: string;
    identification?: string;
    position?: string;
    function?: string;
    type?: Catalogue;
    state?: boolean;
    // REPRESENTANTE LEGAL, COORDINADORE
}
