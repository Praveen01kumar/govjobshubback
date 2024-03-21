/* eslint-disable prettier/prettier */
import { PostList } from './post.table';
import { POST_LIST_TABLE } from 'src/constants';

export const postlistProviders = [{
    provide: POST_LIST_TABLE,
    useValue: PostList,
}];