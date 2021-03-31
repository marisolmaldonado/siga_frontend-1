import {Catalogue, Observation, State} from '../app/models.index';
import {Attendance} from './models.index';

export interface Task {
    id?: number;
    attendance?: Attendance;
    description?: string;
    percentage_advance?: number;
    type?: Catalogue;
    state?: boolean;
    observations?: Observation[];
    observation?: string;
}
