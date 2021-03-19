import {Catalogue, State} from './/models.index';

export interface Location {
    id?: number;
    parent?: Location;
    code?: string;
    name?: string;
    type?: Catalogue;
    icon?: string;
    state?: boolean;
}
