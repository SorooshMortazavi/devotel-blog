import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Req,
  BadRequestException,
  Query,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileName, imgFilter } from 'src/common/utils/multer/img-update.utils';
import { QueryPostDto } from './dto/query-post.dto';
import { imageUrlGenerator } from 'src/common/utils/image-url-generator';
import { FirebaseAuthGuard } from 'src/common/gaurd/firebase-auth.guard';
import { RolesGuard } from 'src/common/gaurd/roles.guard';
import { Public } from 'src/common/decorators/public.decorator';
import { RolesAllowed } from 'src/common/decorators/roles.decorator';
import { UserRoles } from 'src/common/constants/UserRoles';

@Controller('posts')
@UseGuards(FirebaseAuthGuard, RolesGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './img',
        filename: fileName,
      }),
      fileFilter: imgFilter,
    }),
  )
  @Post()
  @RolesAllowed(UserRoles.ADMIN)
  async create(
    @Req() req,
    @UploadedFile() file,
    @Body() createPostDto: CreatePostDto,
  ) {
    if (!file) {
      throw new BadRequestException('Image not provided');
    }
    const host = req.headers.host;
    createPostDto.image = file.filename;
    const post = await this.postService.create(createPostDto);
    post.image = imageUrlGenerator(host, post.image);

    return {
      success: true,
      post,
    };
  }

  @Get()
  @Public()
  async findAll(@Req() req, @Query() query: QueryPostDto) {
    const host = req.headers.host;
    let [posts, count] = await this.postService.findAll(query);

    posts = posts.map((post) => ({
      ...post,
      image: imageUrlGenerator(host, post.image),
    }));

    return {
      success: true,
      count,
      posts,
    };
  }

  @Get(':id')
  @Public()
  async findOne(@Req() req, @Param('id') id: number) {
    const host = req.headers.host;
    const post = await this.postService.findOne(+id);
    if (!post) {
      throw new NotFoundException('Post not found.');
    }
    post.image = imageUrlGenerator(host, post.image);
    return {
      success: true,
      post,
    };
  }

  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './img',
        filename: fileName,
      }),
      fileFilter: imgFilter,
    }),
  )
  @Patch(':id')
  @RolesAllowed(UserRoles.ADMIN)
  async update(
    @Req() req,
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @UploadedFile() file,
  ) {
    if (file) {
      updatePostDto.image = file.filename;
    }
    const post = await this.postService.update(+id, updatePostDto);
    return {
      success: true,
      post,
    };
  }

  @Delete(':id')
  @RolesAllowed(UserRoles.ADMIN)
  async remove(@Param('id') id: string) {
    await this.postService.remove(+id);
    return {
      success:true,
    }
  }
}
