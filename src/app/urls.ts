export const BACKEND_URLS = {
    LOGIN: 'http://127.0.0.1:8000/auth/token/login',
    LOGOUT: 'http://127.0.0.1:8000/auth/token/logout',
    SIGNUP: 'http://127.0.0.1:8000/auth/users/',
    RECIPE_BOOKS: 'http://127.0.0.1:8000/api/recipe-books',
    SINGLE_RECIPE_BOOK: 'http://127.0.0.1:8000/api/recipe-books/${slug}',
    RECIPES: 'http://127.0.0.1:8000/api/recipes',
    SINGLE_RECIPE: 'http://127.0.0.1:8000/api/recipes/${slug}',
    RECOMMENDED_RECIPES: 'http://127.0.0.1:8000/api/users/${userID}/recommended-recipes',
}
