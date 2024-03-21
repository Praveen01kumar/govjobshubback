/* eslint-disable prettier/prettier */
import { Controller, Post, Request } from '@nestjs/common';
import { PostDetailService } from './postdetail.service';
import { PostDataService } from '../postData/postdata.service';
import { PostListService } from '../postList/post.service';
import { PostDetailDto } from './postdetail.dto';
import { Cron, CronExpression } from '@nestjs/schedule';

const MAX_RETRIES = 100;
const RETRY_DELAY = 5000;

@Controller('postdetail')
export class PostDetailController {
    constructor(
        private readonly postdetailService: PostDetailService,
        private readonly postDataService: PostDataService,
        private readonly postListService: PostListService,
    ) { }

    @Post('create')
    async getdetail(): Promise<any> {
        try {
            const dataList = await this.postDataService.findAll();
            if (dataList && dataList.length > 0) {
                for (const entry of dataList) {
                    const url = entry['dataValues']?.data_link;
                    const postdata_id = entry['dataValues']?.id;
                    const existingPostDetail = await this.postdetailService.findOneByPId(postdata_id);
                    const detaildata = existingPostDetail['dataValues'].detaildata;
                    if (existingPostDetail && detaildata === null) {
                        const detail: string = await this.postListService.getDetail(url);
                        if (detail) {
                            const recData: Partial<PostDetailDto> = { detaildata: detail };
                            await this.postdetailService.updateDetail(recData, postdata_id);
                        }
                    }
                }
                return {
                    status: true,
                    message: "Detail data Updated Successfully!"
                };
            } else {
                return {
                    status: false,
                    message: "No data available to update posts detail!"
                };
            }
        } catch (error) {
            throw error;
        }
    }

    @Cron(CronExpression.EVERY_5_MINUTES)
    async scheduledTask() {
        await this.runTaskWithRetry(MAX_RETRIES);
    }
    private async runTaskWithRetry(retries: number) {
        try {
            await this.getdetail();
            console.log('Task to update detail data completed successfully!');
        } catch (error) {
            console.error(`Error in the scheduled task for detail data:`, error);
            if (retries > 0) {
                console.log(`Retrying in ${RETRY_DELAY / 1000} seconds... (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})`);
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
                await this.runTaskWithRetry(retries - 1);
            } else {
                console.error('Max retries reached for detail data. Task failed.');
            }
        }
    }

    @Post('detaildata')
    async findOneBydataId(@Request() req) {
        const data_id: string = req?.body?.postdata_id;
        const dataList = await this.postdetailService.findOneByPId(data_id);
        return { data: dataList, status: true, message: "Job Detail found successfully!" }
    }

}