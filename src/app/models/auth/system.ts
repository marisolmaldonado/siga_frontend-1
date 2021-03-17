import {State} from '../app/models.index';

export interface System {
    id?: number;
    code?: string;
    name?: string;
    acronym?: string;
    description?: string;
    version?: string;
    date?: Date;
    type?: string;
    icon?: string;
    state?: boolean;
}
