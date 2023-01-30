export interface RecipeBook {
    slug: string;
    title: string;
    isbn: number;
    category: string;
    publisher?: string;
    authors: [];
}

export interface RecipeBookData {
    count: number,
    next?: string,
    previous?: string,
    results: RecipeBook[];
}