export interface Category {
    id?: number;
    code?: string;
    name?: string;
    icon?: string;
    parent?: Category;
    children?: Category[];
    type?: Category;
}
