import { Post } from 'src/post/post.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../role/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  displayName: string;

  @Column({
    default: null,
  })
  quote: string;

  @Column({
    default: null,
  })
  avtUrl: string;

  @Column({
    default: null,
  })
  facebookId: string;

  @Column({
    default: null,
  })
  pageUserId: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
