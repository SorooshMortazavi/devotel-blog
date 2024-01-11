import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { DatabaseModule } from 'src/common/database';
import { Post } from './entities/post.entity';
import { PostRepository } from './post.repository';

@Module({
  imports:[
    DatabaseModule.forFeature([Post]),
  ],
  controllers: [PostController],
  providers: [PostService,PostRepository],
})
export class PostModule {}
