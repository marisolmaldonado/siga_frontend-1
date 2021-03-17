import {State} from '../app/models.index';
import {SchoolPeriodo} from '../app/models.index';
import {EvaluationType} from '../teacher-eval/models.index';
import {Catalogue} from '../app/models.index';
import {Teacher} from '../app/models.index';

export interface Evaluation{
    id?: number;
    result?: number;
    evaluation_type?: EvaluationType;
    percentage?: number;
    school_period?: SchoolPeriodo;
    teacher?: Teacher;
    evaluators?: Teacher[];
    state?: boolean;
    status?: Catalogue;
}
