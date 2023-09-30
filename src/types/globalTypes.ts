export interface IBook{
    _id:string;
    title:string;
    author:string;
    genre:string;
    publication_date:number;
    image:string;
    reviews:string[];
    added_by:string | null;
    finished?:boolean;

}