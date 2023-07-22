export interface IBook{
    _id:string;
    title:string;
    author:string;
    genre:string;
    publication_date:number;
    image:string;
    added_by:string | null;

}