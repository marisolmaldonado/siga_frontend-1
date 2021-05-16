export interface Paginator {
    current_page: string;
    first_page_url?: string;
    from?: string;
    last_page?: string;
    last_page_url?: string;
    links?: Link[];
    next_page_url?: string;
    path?: string;
    per_page: string;
    prev_page_url?: string;
    to?: string;
    total?: string;
}

export interface Link {
    url?: string;
    label?: string;
    active?: string;
}
