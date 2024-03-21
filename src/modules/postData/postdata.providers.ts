/* eslint-disable prettier/prettier */
import { POST_DATA_TABLE } from 'src/constants';
import { PostData } from './postdata.table';

export const postdataProviders = [{
    provide: POST_DATA_TABLE,
    useValue: PostData,
}];