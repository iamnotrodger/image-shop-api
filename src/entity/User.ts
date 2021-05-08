import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('text', { unique: true })
    username?: string;

    @Column('text')
    password?: string;

    @CreateDateColumn()
    joined?: Date;
}
