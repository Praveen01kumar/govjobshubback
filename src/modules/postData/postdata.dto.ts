/* eslint-disable prettier/prettier */

import { IsNotEmpty } from "class-validator";

export class PostDataDto {

    @IsNotEmpty()
    readonly data_name: string;

    @IsNotEmpty()
    readonly data_link: string;

}