/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { postdetailProviders } from './postdetail.providers';
import { PostDetailController } from './postdetail.controller';
import { PostDetailService } from './postdetail.service';
import { PostDataService } from '../postData/postdata.service';
import { postdataProviders } from '../postData/postdata.providers';
import { PostListService } from '../postList/post.service';
import { postlistProviders } from '../postList/post.providers';

@Module({
    providers: [PostDetailService, PostDataService, PostListService, ...postlistProviders, ...postdataProviders, ...postdetailProviders],
    controllers: [PostDetailController],
    exports: [PostDetailService]
})
export class PostDetailModule { }
