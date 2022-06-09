import { IsEmail, IsString, Length } from "class-validator";

export class UpdatePassDto {
    @IsString({message:"Need type: string"})
    @IsEmail({message: "Email is inccorect"})
    readonly email: string;

    @IsString({message:"Need type: string"})
    @Length(4, 16, {message: "Need more than 5 and less than 20 characters "})
    readonly password: string;
}