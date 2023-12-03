import { IRight } from "./right-model";

export interface IRole{
    name:string;
    id:number;
    Rights: IRight[]
}