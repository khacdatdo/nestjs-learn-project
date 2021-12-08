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

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  time: string;

  @Column()
  facebookPostId: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @OneToMany(() => Confession, (confession) => confession.post)
  confessions: Confession[];
}
