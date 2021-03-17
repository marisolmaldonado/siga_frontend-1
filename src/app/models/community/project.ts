import {Catalogue, Career, SchoolPeriodo} from '../app/models.index';
import {Participant, Objective, BeneficiaryInstitution, StakeHolder, Activity} from '../community/models.index';

export interface Project {
    id?: number;
    title?: string;
    // nuevo campo 
    state?: Catalogue;
    school_period?: SchoolPeriodo;
    code?: string;
    // REVISRA NUEVO FORMATO YA NO TIENE assigned_line?: Catalogue; // linea de investigacion
    field?: Catalogue;
    career?: Career;
    // REVISRA NUEVO FORMATO YA NO TIENE aim?: string; // objeto
    cycle?: string; // ciclo VARIOS (SELECCION MULTIPLE)
    location?: Catalogue; // trae la parroquia y con eso saca los demas campos 
    lead_time?: number; // plazo de ejecucion
    delivery_date?: Date;
    start_date?: Date;
    end_date?: Date;
    introduction?: string;
    situational_analysis?: string;
    foundamentation?: string;
    justification?: string;
    frequency_activities?: Catalogue; 
    activities?: Activity[]; // VERIFICAR SI ESTA BIEN ESTO POR EL ID DE PROYECTO QUE TIENE EL MODELO
    description?: string; 
    participants?: Participant[];
    objectives?: Objective[];
    beneficiary_institution?: BeneficiaryInstitution;
    observations?: string[]; // REVISION (EN ESPERA)
    direct_beneficiaries?: string;
    indirect_beneficiaries?: string;
    state_holder?: StakeHolder;
}
