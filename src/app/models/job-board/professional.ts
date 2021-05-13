import { User } from "../auth/user";
import { 
    AcademicFormation,
    Category,
    Skill
} from "./models.index";

export interface Professional {
    id?: number;
    is_travel?: boolean;
    is_disability?: boolean;
    has_familiar_disability?: boolean;
    identification_familiar_disability?: boolean;
    has_catastrophic_illness?: boolean;
    has_familiar_catastrophic_illness?: boolean;
    about_me?: string;
    user?: User;
    // offer?: Offer;
    // company?: Company;
    // references?: Reference[];
    academic_formations?: AcademicFormation[];
    // courses?: Course[];
    categories?: Category[];
    // experiences?: Experience[];
    professionals?: Professional[];
    // languages?: Language[];
    skills?: Skill[];
}
