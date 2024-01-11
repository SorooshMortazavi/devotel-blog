import { Logger, NotFoundException } from '@nestjs/common';
import { AbstractEntity } from './abstract.entity';
import {
  EntityManager,
  FindOneOptions,
  FindOptionsOrder,
  FindOptionsRelationByString,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class AbstractRepository<T extends AbstractEntity<T>> {
  protected abstract readonly logger: Logger;

  constructor(
    public readonly itemsRepository: Repository<T>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(entity: T): Promise<T> {
    return this.entityManager.save(entity);
  }

  async findOne(
    where: FindOneOptions<T>,
    relations?: FindOptionsRelations<T>,
  ): Promise<T | null> {
    const entity = await this.itemsRepository.findOne({ ...where, ...(relations ? {relations} : {}) });

    if (!entity) {
      this.logger.warn('Document not found with where', where);
      return null
    }

    return entity;
  }

  async findOneAndUpdate(
    where: FindOptionsWhere<T>,
    partialEntity: QueryDeepPartialEntity<T>,
  ): Promise<T | null> {
    const updateResult = await this.itemsRepository.update(
      where,
      partialEntity,
    );

    if (!updateResult.affected) {
      this.logger.warn('Entity not found with where', where);
      // throw new NotFoundException('Entity not found.');
      return null
    }

    return this.findOne({where});
  }

  async find(where: FindOptionsWhere<T>) {
    return this.itemsRepository.findBy(where);
  }

  async findAndCount(
    where: FindOptionsWhere<T>,
    page: number,
    pageSize: number,
    order?: FindOptionsOrder<T>,
    relations?: FindOptionsRelations<T> | FindOptionsRelationByString,
  ):Promise<[T[], number]> {
    return this.itemsRepository.findAndCount({
      where,
      ...(relations ? { relations } : {}),
      skip: pageSize * (page - 1),
      take: pageSize,
      ...(order ? {order}:{}),
    });
  }

  async findOneAndDelete(where: FindOptionsWhere<T>) {
    await this.itemsRepository.delete(where);
  }
}
