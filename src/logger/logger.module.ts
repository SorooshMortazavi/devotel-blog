import { Module } from '@nestjs/common';
import {LoggerModule as PinoLoggerModule} from 'nestjs-pino';

@Module({
  imports: [
    //pino is a package for handling logs.
    PinoLoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class LoggerModule {}
