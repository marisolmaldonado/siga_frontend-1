import {Catalogue, State} from './/models.index';

export interface Career {
    id?: number;
    code: string;
    name: string;
    description: string;
    modality: Catalogue;
    type: Catalogue;
    resolution_number: string;
    title: string;
    acronym: string;
    state?: boolean;

}
