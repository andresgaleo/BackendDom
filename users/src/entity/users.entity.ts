import {Entity,Column, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class UsersE{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column()
    email:string;
    @Column()
    pwd:string;
}