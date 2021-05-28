export interface Category {
    id: number;
    parent_id: null;
    code: string;
    name: string;
    icon: null;
    deleted_at: null;
    created_at: string;
    updated_at: string;
    pivot: Pivot;
    parent: null;
}

export interface Pivot {
    offer_id: number;
    category_id: number;
    created_at: string;
    updated_at: string;
}
