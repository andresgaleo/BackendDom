import { Entity,Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Tasks{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    description:string;
    @Column()
    status:string;
    @Column()
    user_id:number
}