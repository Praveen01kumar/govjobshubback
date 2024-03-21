/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { PostDataService } from './postdata.service';

@Controller('postdata')
export class PostDataController {
    constructor(private readonly postDataService: PostDataService) { }

    @Get()
    async findAll() {
        return await this.postDataService.findAll();
    }



}