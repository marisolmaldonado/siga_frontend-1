import {Status} from './status';

export interface SchoolPeriodo {
    id?: number;
    status?: Status;
    code?: string;
    name?: string;
    start_date?: Date;
    end_date?: Date;
    
}
