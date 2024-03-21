/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { postdataProviders } from './postdata.providers';
import { PostDataController } from './postdata.controller';
import { PostDataService } from './postdata.service';

@Module({
    providers: [PostDataService, ...postdataProviders],
    controllers: [PostDataController],
    exports:[PostDataService]
})
export class PostDataModule { }
