/* eslint-disable prettier/prettier */
import { Table, Column, Model, DataType, ForeignKey, PrimaryKey, Default, HasOne } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { PostList } from '../postList/post.table';
import { PostDetail } from '../postDetail/postdetail.table';

@Table({tableName:'postdatas'})
export class PostData extends Model<PostData> {

    @PrimaryKey
    @Default(() => uuidv4())
    @Column({
        type: DataType.UUID,
        allowNull: false,
        defaultValue: () => uuidv4(),
    })
    id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    data_name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    data_link: string;

    @ForeignKey(() => PostList)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    postlistId: string;

    @HasOne(() => PostDetail)
    postdetail: PostDetail;

}