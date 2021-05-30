import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/services/users.service';
import { User } from 'src/users/entities/users.entity';
import { PayloadToken } from 'src/auth/models/token.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    //validamos que haya un usuario antes de matchear las contraseñas
    console.log(user.password)
    if (user) {
      console.log(password)
      const isMatch = await bcrypt.compare(password, user.password);
      console.log(isMatch)
      if (user && isMatch) {
        console.log(user)
        const { password, ...rta } = user.toJSON();
        return rta;
      }
    }
    return null;
  }

  generateJWT(user: User) {
    console.log(user._id)
    const payload: PayloadToken = {
      role: user.role,
      sub: user._id,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
