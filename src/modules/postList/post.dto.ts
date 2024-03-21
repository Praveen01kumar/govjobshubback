/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class PostListDto {

    @IsNotEmpty()
    readonly post_name: string;

    @IsNotEmpty()
    readonly post_link: string;

}