import {State} from './/models.index';

export interface File {
    id?: number;
    code: string;
    name: string;
    type: string;
    state?: boolean;
    uri: string;

}
