import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
  Strategy,
  'firebase-auth',
) {

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(token: string) {
    const decodedTokenData =
      await this.authService.firebaseVerifyIdToken(token);

    if (!decodedTokenData) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findOne({
      where: { firebaseUid: decodedTokenData.uid },
    });

    return {
      id: user.id,
      role: user.role,
    };
  }
}
