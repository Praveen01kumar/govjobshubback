/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { POST_DATA_TABLE } from 'src/constants';
import { PostData } from './postdata.table';
import { PostDataDto } from './postdata.dto';

@Injectable()
export class PostDataService {
    constructor(@Inject(POST_DATA_TABLE) private readonly postdataTable: typeof PostData) { }

    async findAll(): Promise<PostData[]> {
        return await this.postdataTable.findAll<PostData>();
    }
    
    async create(postdata: Partial<PostDataDto>, postlistId: string): Promise<PostData> {
        return await this.postdataTable.create<PostData>({ ...postdata, postlistId });
    }

    

}