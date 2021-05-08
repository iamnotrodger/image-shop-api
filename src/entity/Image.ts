import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import User from './User';

@Entity()
export default class Image {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'user', nullable: true })
    userId?: number;

    @ManyToOne(() => User, (user) => user.images, {
        nullable: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'user' })
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
