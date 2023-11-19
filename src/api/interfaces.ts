export interface IUser{
    id:number;
    fname:string;
    lanme:string;
    birthday:string;
    phone:string;
    email:string;
}

export interface IWorker extends IUser{
    role:string;
    ratetype:string;
    rate:number;
    login:string;
    pass:string;
}

export interface IClient extends IUser{
    direction: string;
    lessons_count:number;
    lessons_buyed:number;
    status:string;
}

export interface IRole{
    name:string;
    id:number;
}[]

export interface IDirection{
    name:string;
    id:number;
}

export interface IRateType{
    name:string;
    id:number;
}[]

export interface IStatus{
    name:string;
    id:number;
}[]

export interface INote{
    id:number;
    clientid:number;
    workerid:number;
    message:string;
}

