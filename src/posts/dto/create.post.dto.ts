import { IsOptional, IsString } from "class-validator";


export class CreatePostDto {
  @IsString()
  caption: string;
  
  @IsString()
  @IsOptional()
  imageURL: string;
}