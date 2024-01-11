import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from 'src/common/database';
import { EntityManager, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserRepository extends AbstractRepository<UserEntity> {
  protected readonly logger = new Logger("UserRepository");

  constructor(
    @InjectRepository(UserEntity)
    UserRepository: Repository<UserEntity>,
    entityManager: EntityManager,
  ) {
    super(UserRepository, entityManager);
  }
}
