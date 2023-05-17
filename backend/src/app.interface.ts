export interface Users{
    id:string,
    name:string,
    email:string,
    pwd:string
}

export interface Task{
    id:number;
    description:string;
    status:string;
    user_id:number
}