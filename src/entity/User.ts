import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import Image from './Image';

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('text', { unique: true })
    username?: string;

    @Column('text')
    password?: string;

    @OneToMany(() => Image, (photo) => photo.user)
    images?: Image[];

    @CreateDateColumn()
    joined?: Date;
}
