import { IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { isString } from 'util';

export class SignupAuthDto {
  @IsString()
  @IsEmail()
  @MinLength(4)
  @MaxLength(30)
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(30)
  username: string;

  @IsString()
  @MinLength(1)
  @MaxLength(30)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'password too weak',
  // })
  password: string;

  @IsOptional()
  @IsString()
  profilePicture: string;
}
