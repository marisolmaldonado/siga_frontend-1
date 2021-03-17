import { AnswerQuestion } from './answer-question';
import {Student} from '../app/models.index';
import {SubjectTeacher} from '../app/subject-teacher';

export interface StudentEvaluation {
    id?: number;
    subject_teacher?: SubjectTeacher;
    student?: Student;
    answer_questions?: AnswerQuestion[];
}
