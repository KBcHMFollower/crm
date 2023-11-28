import { IRateType } from "./ratetype-model";
import { IRole } from "./role-model";
import { IUser } from "./user-model";

export interface IWorker extends IUser{
    WorkersRate:{
        id:number;
        rate:number;
        RateType:IRateType,
    },
    Role:IRole
}