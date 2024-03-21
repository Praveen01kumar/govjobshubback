/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { postlistProviders } from './post.providers';
import { PostListService } from './post.service';
import { PostlistController } from './post.controller';
import { PostDataService } from '../postData/postdata.service';
import { postdataProviders } from '../postData/postdata.providers';
import { PostDetailService } from '../postDetail/postdetail.service';
import { postdetailProviders } from '../postDetail/postdetail.providers';

@Module({
    providers: [PostListService, PostDataService, PostDetailService, ...postdetailProviders, ...postdataProviders, ...postlistProviders],
    controllers: [PostlistController]
})
export class PostListModule { }