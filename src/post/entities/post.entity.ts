import { AbstractEntity } from 'src/common/database';
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity()
export class Post extends AbstractEntity<Post> {

  @Column({
    nullable:false
  })
  title: string;

  @Column({
    nullable:false
  })
  content: string;

  @Column({nullable:true})
  image: string;


  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP(6)', default: () => 'CURRENT_TIMESTAMP(6)' })
  updatedAt: Date;

}
