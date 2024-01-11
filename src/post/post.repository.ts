import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from 'src/common/database';
import { EntityManager, Repository } from 'typeorm';
import { Post as PostEntity } from './entities/post.entity';

@Injectable()
export class PostRepository extends AbstractRepository<PostEntity> {
  protected readonly logger = new Logger("PostRepository");

  constructor(
    @InjectRepository(PostEntity)
    PostRepository: Repository<PostEntity>,
    entityManager: EntityManager,
  ) {
    super(PostRepository, entityManager);
  }
}
