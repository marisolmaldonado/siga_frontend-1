import {User} from '../auth/models.index';
import {State} from '../app/models.index';
import {Task, Workday} from './models.index';

export interface Attendance {
    id?: number;
    attendanceable?: User;
    date?: Date;
    workdays?: Workday[];
    tasks?: Task[];
    state?: boolean;
}
