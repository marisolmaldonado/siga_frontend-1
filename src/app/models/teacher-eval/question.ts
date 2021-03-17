import {State} from '../app/models.index';
import {Catalogue} from '../app/models.index';
import {EvaluationType} from '../teacher-eval/models.index';

export interface Question {
    id?: number;
    code?: string;
    order?: number;
    name?: string;
    description?: string;
    evaluation_type?: EvaluationType;
    type?: Catalogue;
    state?: boolean;
    status?: Catalogue; 
}
