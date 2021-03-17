import {Addreess} from '../app/address';
import {State} from '../app/state';

export interface BeneficiaryInstitution {
    id?:number;
    logo?: string;
    files?:File[];
    name?: string;
    address?: Addreess; // con calles
    function?: string;
    state?: boolean; // todos llevan state
    // VERIFICAR COMO Y DE DONDE VIENE LA INOFORMACION 
    // nombre representante legal
    // ruc o ccedula representante legal
}
