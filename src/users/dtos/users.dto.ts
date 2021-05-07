import { PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly lastname: string;

  @IsString()
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  readonly password: string;

  @IsNotEmpty()
  readonly role: string
}

export class UpdateUserDto extends PartialType(CreateUserDto){}