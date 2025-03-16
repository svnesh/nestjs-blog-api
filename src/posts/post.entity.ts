import { User } from "src/users/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Post{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  caption: string;

  @Column({ nullable: true })
  imageURL: string;

  @ManyToOne(() => User, (user: User) => user.id)
  @JoinColumn()
  user: User | number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}