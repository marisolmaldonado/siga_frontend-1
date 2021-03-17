import { Evaluation } from '../teacher-eval/models.index'
import {State} from '../app/models.index';

export interface DetailEvaluation {
    id?: number;
    evaluation?: Evaluation;
    state?: boolean;
}
