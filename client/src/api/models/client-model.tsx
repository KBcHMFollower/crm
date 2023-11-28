import { IDirection } from "./direction-model";
import { IStatus } from "./status-model";
import { IUser } from "./user-model";

export interface IClient extends IUser{
    lessons_count:number;
    Status:IStatus,
    Direction:IDirection
}