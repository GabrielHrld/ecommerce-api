import { Module } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controllers/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import {ConfigModule} from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'prod'
          ? `${process.env.NODE_ENV}.env`
          : '.env',
    }),
    UsersModule, 
    PassportModule, 
    JwtModule.registerAsync({
      useFactory: () =>{
        return {
          secret: `${process.env.JWT_SECRET}`,
          signOptions: {
            expiresIn: '15m'
          }
        }
      }
    })
  ],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
