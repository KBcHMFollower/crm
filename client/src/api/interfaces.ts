export interface IUser{
    id:number;
    fname:string;
    lname:string;
    birthday:string;
    phone:string;
    email:string;
}

export interface IWorker extends IUser{
    WorkersRate:{
        id:number;
        rate:number;
        RateType:IRateType,
    },
    Role:IRole
}

export interface IClient extends IUser{
    lessons_count:number;
    Status:IStatus,
    Direction:IDirection
}

export interface IRole{
    name:string;
    id:number;
}

export interface IDirection{
    name:string;
    id:number;
}

export interface IRateType{
    name:string;
    id:number;
}

export interface IStatus{
    name:string;
    id:number;
}

export interface INote{
    id:number;
    ClientId:number;
    WorkerId:number;
    content:string;
}

