import { Post } from 'src/post/post.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Confession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  time: string;

  @Column({
    default: 'SomeOne',
  })
  sender: string;

  @Column()
  context: string;

  @ManyToOne(() => Post, (post) => post.confessions)
  post: Post;
}
