import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as firebaseAdminConfig from '../../devotel-blog-firebase-adminsdk.json';
import * as firebaseAdmin from 'firebase-admin';
import { UserService } from './user.service';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { UserRoles } from 'src/common/constants/UserRoles';
import { RegisterUserDto } from './dto/register-user.dto';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

const firebase_admin_params = {
  type: firebaseAdminConfig.type,
  projectId: firebaseAdminConfig.project_id,
  privateKeyId: firebaseAdminConfig.private_key_id,
  privateKey: firebaseAdminConfig.private_key,
  clientEmail: firebaseAdminConfig.client_email,
  clientId: firebaseAdminConfig.client_id,
  authUri: firebaseAdminConfig.auth_uri,
  tokenUri: firebaseAdminConfig.token_uri,
  authProviderX509CertUrl: firebaseAdminConfig.auth_provider_x509_cert_url,
  clientC509CertUrl: firebaseAdminConfig.client_x509_cert_url,
};

@Injectable()
export class AuthService {
  firebaseAdminService: firebaseAdmin.app.App;
  constructor(private readonly userService: UserService) {}

  private onModuleInit() {
    this.firebaseAdminService = firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(firebase_admin_params),
    });
  }

  async register(registerDto: RegisterUserDto) {
    const user = await this.userService.findOne({
      where: {
        email: registerDto.email,
      },
    });
    if (user) {
      throw new BadRequestException('User aleady registered');
    }
    const userRecord = await this.firebaseCreateUser(registerDto);
    return this.userService.create({
      email: registerDto.email,
      firebaseUid: userRecord.uid,
      role: UserRoles.USER,
    });
  }

  private async firebaseCreateUser(
    registerDto: RegisterUserDto,
  ): Promise<UserRecord> {
    let userRecord: UserRecord;
    try {
      userRecord = await this.firebaseAdminService.auth().createUser({
        email: registerDto.email,
        password: registerDto.password,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Problem with UserRecord creation',
      );
    }

    return userRecord;
  }

  async firebaseVerifyIdToken(token: string): Promise<DecodedIdToken> {
    let decodedTokenData;
    try {
      decodedTokenData = await this.firebaseAdminService
        .auth()
        .verifyIdToken(token, true);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
    return decodedTokenData;
  }
}
