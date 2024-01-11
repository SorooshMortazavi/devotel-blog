import { UserRoles } from 'src/common/constants/UserRoles';
import { AbstractEntity } from 'src/common/database';
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity()
export class UserEntity extends AbstractEntity<UserEntity> {

  @Column({
    nullable:false
  })
  email: string;

  @Column({
    type:'enum',
    enum:UserRoles,
    default:UserRoles.USER
  })
  role: UserRoles;

  @Column({nullable:true})
  firebaseUid: string;


  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP(6)', default: () => 'CURRENT_TIMESTAMP(6)' })
  updatedAt: Date;

}
