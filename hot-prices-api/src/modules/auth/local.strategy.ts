import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { Strategy } from "passport-local";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passReqToCallback: false,
    });
  }

  async validate(email: string, password: string): Promise<any> {
    console.log('local strategy validate', email, password);
    const user = await this.authService.validateUser(email, password);
    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    return user;
  }
}