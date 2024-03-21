/* eslint-disable prettier/prettier */
import { POST_DETAIL_TABLE } from 'src/constants';
import { PostDetail } from './postdetail.table';

export const postdetailProviders = [{
    provide: POST_DETAIL_TABLE,
    useValue: PostDetail,
}];