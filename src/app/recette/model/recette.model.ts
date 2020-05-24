export interface Recette {

    id:string;
    name:string;
    description:string;
}
export interface Ingredients{
    id:string;
    name:string;
    description:string;
    idRecette:string;
}