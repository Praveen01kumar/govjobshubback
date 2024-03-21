/* eslint-disable prettier/prettier */
import { Controller, Post, Get } from '@nestjs/common';
import { PostListService } from './post.service';
import { PostList } from './post.table';
import { PostDataService } from '../postData/postdata.service';
import { PostData } from '../postData/postdata.table';
import { PostDetailService } from '../postDetail/postdetail.service';
import { PostDetailDto } from '../postDetail/postdetail.dto';
import { Cron, CronExpression } from '@nestjs/schedule';

const MAX_RETRIES = 10;
const RETRY_DELAY = 5000;

@Controller('postlist')
export class PostlistController {
    constructor(
        private readonly postListService: PostListService,
        private readonly postDataService: PostDataService,
        private readonly postDetailService: PostDetailService,
    ) { }

    @Get()
    async findAll() {
        const dataList = await this.postListService.findAll();
        return { data: dataList, status: true, message: "Job Listing found successfully!" }
    }

    @Post('create')
    async create(): Promise<any> {
        try {
            const dataList = await this.postListService.getResults();
            console.log('dataList', dataList);
            
            if (dataList && dataList.length > 0) {
                await this.postListService.deleteAll();
                const createdPosts: PostList[] = [];
                for (const entry of dataList) {
                    try {
                        const createdPost: PostList = await this.postListService.create({ post_name: entry.post_name, post_link: entry.post_link });
                        if (createdPost) {
                            const postdata_id = createdPost['dataValues']?.id;
                            if (entry?.data && entry?.data?.length > 0) {
                                const createDataPromises = entry.data.map(async (el) => {
                                    const createdData: PostData = await this.postDataService.create({ data_name: el.name, data_link: el.link }, postdata_id);
                                    if (createdData) {
                                        const data_id = createdData['dataValues']?.id;
                                        const createDetail: PostDetailDto = { detaildata: null };
                                        await this.postDetailService.create(createDetail, data_id);
                                    }
                                });
                                await Promise.all(createDataPromises);
                            }
                        }
                        createdPosts.push(createdPost);
                    } catch (error) {
                        throw error;
                    }
                }
                return {
                    status: true,
                    message: "Posts list updated successfully!"
                };
            } else {
                return {
                    status: false,
                    message: "No data available to create posts list."
                };
            }
        } catch (error) {
            throw error;
        }
    }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async scheduledTask() {
        await this.runTaskWithRetry(MAX_RETRIES);
    }
    private async runTaskWithRetry(retries: number) {
        try {
            await this.create();
            console.log('Task for find post data is completed successfully');
        } catch (error) {
            console.error(`Error in the scheduled task for list data:`, error);
            if (retries > 0) {
                console.log(`Retrying in ${RETRY_DELAY / 1000} seconds... (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})`);
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
                await this.runTaskWithRetry(retries - 1);
            } else {
                console.error('Max retries reached for list data. Task failed.');
            }
        }
    }

}