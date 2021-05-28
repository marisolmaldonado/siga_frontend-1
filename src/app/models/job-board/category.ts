export interface Category {
    id?: number;
    code?: string;
    name?: string;
    icon?: string;
    is_principal?: boolean;
    parent?: Category;
    children?: Category[];
    type?: Category;
}
