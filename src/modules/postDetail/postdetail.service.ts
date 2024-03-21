/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { POST_DETAIL_TABLE } from 'src/constants';
import { PostDetail } from './postdetail.table';
import { PostDetailDto } from './postdetail.dto';

@Injectable()
export class PostDetailService {
    constructor(@Inject(POST_DETAIL_TABLE) private readonly postdetailData: typeof PostDetail) { }

    async findAll(): Promise<PostDetail[]> {
        return await this.postdetailData.findAll<PostDetail>({});
    }

    async create(postdetail: Partial<PostDetailDto>, postdata_id: string): Promise<PostDetail> {
        return await this.postdetailData.create<PostDetail>({ ...postdetail, postdata_id });
    }

    async updateDetail(detail: Partial<PostDetailDto>, postdata_id: string): Promise<number> {
        const [rec] = await this.postdetailData.update(
            { ...detail },
            { where: { postdata_id } }
        );
        return rec;
    }

    async findOneByPId(postdata_id: string): Promise<PostDetail> {
        return await this.postdetailData.findOne<PostDetail>(
            { where: { postdata_id } }
        );
    }
    
}