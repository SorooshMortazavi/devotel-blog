import {IsString,MinLength,MaxLength} from 'class-validator';
export class CreatePostDto {
    image?:string

    @IsString()
    @MinLength(3)
    @MaxLength(100)
    title:string

    @IsString()
    @MinLength(3)
    @MaxLength(5000)
    content:string
}
