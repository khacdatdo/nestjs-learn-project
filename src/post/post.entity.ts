import { Confession } from 'src/confession/confession.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  time: Date;

  @Column()
  facebookPostId: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @OneToMany(() => Confession, (confession) => confession.post)
  confessions: Confession[];
}
