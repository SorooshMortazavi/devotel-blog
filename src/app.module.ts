import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import {ConfigModule} from '@nestjs/config';
import { LoggerModule } from './logger/logger.module';
import * as Joi from 'joi';
import {ServeStaticModule} from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './common/database';



@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..",'img'),
      serveRoot:'/images/',
      serveStaticOptions:{
        index:false,
      }
    }),
    ConfigModule.forRoot({
      envFilePath:'.env',
      isGlobal: true,
      validationSchema: Joi.object({
        HTTP_PORT: Joi.number().required(),
      }),
    }),
    PostModule,
    LoggerModule,
    AuthModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
