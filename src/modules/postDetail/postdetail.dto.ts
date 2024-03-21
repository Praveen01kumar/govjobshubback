/* eslint-disable prettier/prettier */

import { IsNotEmpty } from "class-validator";

export class PostDetailDto {

    @IsNotEmpty()
    readonly detaildata: string;

}