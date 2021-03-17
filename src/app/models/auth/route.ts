import {Catalogue, Image, State} from '../app/models.index';

export interface Route {
    id?: number;
    uri: string;
    name: string;
    icon?: string;
    order: number;
    description?: string;
    state: State;
    module: Catalogue;
    type: Catalogue;
    status: Catalogue;
    parent?: Catalogue;
    images?: Image[];
    image?: Image;
    logo?: Image;
}
