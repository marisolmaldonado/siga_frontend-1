import {Catalogue} from '../app/catalogue'
import { State } from '../app/state';

export interface EvaluationType {
    id?: number;
    code?: string;
    name?: string;
    percentage?: number;
    global_percentage?: number;
    parent_code?: Catalogue;
    status?: Catalogue;
    state?: boolean;
   

}
