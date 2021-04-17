import {Catalogue, Institution} from '../app/models.index';
import {Image} from '../app/models.index';
import {Role} from './models.index';
import {Attendance} from '../attendance/attendance';

export interface User {
    id?: number;
    first_name?: string;
    second_name?: string;
    first_lastname?: string;
    second_lastname?: string;
    identification?: string;
    username?: string;
    password?: string;
    new_password?: string;
    password_confirmation?: string;
    ethnic_origin?: Catalogue;
    location?: Catalogue;
    identification_type?: Catalogue;
    sex?: Catalogue;
    gender?: Catalogue;
    state?: Catalogue;
    birthdate?: Date;
    phone?: string;
    email?: string;
    images?: Image[];
    avatar?: string;
    roles?: Role[];
    role?: Role;
    institutions?: Institution[];
    attendances?: Attendance[];
    attendance?: Attendance;
}
