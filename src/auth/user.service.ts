import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { FindOneOptions } from 'typeorm';
import { UserRoles } from 'src/common/constants/UserRoles';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {
    (async() => {
      // const result = await this.userRepository.create(new UserEntity({
      //   email:"soroosh.mortazavi@gmail.com",
      //   role:UserRoles.ADMIN,
      //   firebaseUid:"thte8XmlaAe42WFVb6TIDfiTVNl2",
        

      // }))

      // console.log(result);
    })()
  }

  create(createUserDto: CreateUserDto) {
    const user: UserEntity = new UserEntity({
      ...createUserDto,
    });
    return this.userRepository.create(user);
  }

  findOne(findOneOption:FindOneOptions<UserEntity>):Promise<UserEntity | null> {
    return this.userRepository.findOne(findOneOption);
  }
}
