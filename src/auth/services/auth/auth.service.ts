import { Injectable } from '@nestjs/common';
import { UsersService} from '../../../users/services/users.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService){}

  async validateUser(email: string, pass:string){
    const user = await this.usersService.findByEmail(email);
    //validamos que haya un usuario antes de matchear las contraseñas
    if(user){
      const isMatch = await bcrypt.compare(pass, user.password);
      if (user && isMatch) {
        const {password, ...rta} = user.toJSON()
        return rta
      };
    }
    return null;
  }
}
