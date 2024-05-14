import { IsNumber, IsOptional, IsString } from 'class-validator';

export class RegisteredClaimDto {
    @IsString()
    @IsOptional()
    iss: string;

    @IsString()
    @IsOptional()
    sub: string;

    @IsString()
    @IsOptional()
    aud: string;

    @IsString()
    @IsOptional()
    jti: string;

    @IsNumber()
    @IsOptional()
    nbf: number;
}
