import {Catalogue, State} from '../app/models.index';
import { Project } from './models.index';

export interface Activity {
    id?:number;
    project?: Project;
    type?: Catalogue; 
    description?: string;
    state?: boolean;
}
