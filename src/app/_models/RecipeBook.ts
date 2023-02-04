export interface RecipeBook {
    slug: string;
    title: string;
    isbn?: string;
    style?: string;
    category: string;
    publisher?: string;
    publication_date?: string;
    sections?: string[];
    description?: string;
    publicly_accessible: boolean;
    contributors?: [];
}

export interface RecipeBookData {
    count: number,
    next?: string,
    previous?: string,
    results: RecipeBook[];
}