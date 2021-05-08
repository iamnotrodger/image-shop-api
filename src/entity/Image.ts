import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import User from './User';

@Entity()
export default class Image {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, (user) => user.images, {
        nullable: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    user?: User;

    @Column('text')
    name!: string;

    @Column('text')
    path!: string;

    @Column('text')
    url!: string;

    @CreateDateColumn()
    created?: Date;
}
