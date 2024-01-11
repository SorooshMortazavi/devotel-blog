import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './post.repository';
import { Post } from './entities/post.entity';
import { QueryPostDto } from './dto/query-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const post: Post = new Post({ ...createPostDto });
    return await this.postRepository.create(post);
  }

  async findAll(query: QueryPostDto): Promise<[Post[], number]> {
    return this.postRepository.findAndCount({}, query.page, query.pageSize, {
      createdAt: 'DESC',
    });
  }

  async findOne(id: number): Promise<Post> {
    return this.postRepository.findOne({ where: { id } });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await this.postRepository.findOneAndUpdate(
      {
        id,
      },
      {
        ...updatePostDto,
      },
    );
  }

  async remove(id: number) {
    return this.postRepository.findOneAndDelete({id})
  }
}
