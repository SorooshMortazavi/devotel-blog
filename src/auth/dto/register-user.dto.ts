import { IsEmail, IsStrongPassword } from "class-validator"

export class RegisterUserDto {

   @IsStrongPassword({
        minLength:6,
        minLowercase:1,
        minNumbers:1,
        minUppercase:1
    })
    password:string

    @IsEmail()
    email:string
}