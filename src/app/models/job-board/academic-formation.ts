import { Professional, Category } from "./models.index";

export interface AcademicFormation {
    id?: number;
    registration_date?: Date;
    senescyt_code?: string;
    has_titling?: boolean;
    professional?: Professional;
    professional_degree?: Category;
}
