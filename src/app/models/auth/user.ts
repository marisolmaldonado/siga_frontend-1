import {Catalogue, Institution, Image} from '../app/models.index';
import {Role} from './models.index';

export interface User {
    id?: number;
    full_name?: string;
    full_lastname?: string;
    partial_name?: string;
    partial_lastname?: string;
    first_name?: string;
    second_name?: string;
    first_lastname?: string;
    second_lastname?: string;
    identification?: string;
    username?: string;
    password_old?: string;
    password?: string;
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
    is_changed_password?: boolean;
    images?: Image[];
    avatar?: string;
    roles?: Role[];
    role?: Role;
    institutions?: Institution[];
}
