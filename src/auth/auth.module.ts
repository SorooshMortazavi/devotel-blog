import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserEntity } from './entities/user.entity';
import { DatabaseModule } from 'src/common/database';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { FirebaseAuthStrategy } from './strategies/firebase-auth.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[
    DatabaseModule.forFeature([UserEntity]),
    PassportModule
  ],
  controllers: [AuthController],
  providers: [AuthService,UserRepository,UserService,FirebaseAuthStrategy],
})
export class AuthModule {}
