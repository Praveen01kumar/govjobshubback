/* eslint-disable prettier/prettier */
import { Table, Column, Model, DataType, PrimaryKey, Default, HasMany } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { PostData } from '../postData/postdata.table';

@Table({tableName:'postlists'})
export class PostList extends Model<PostList> {

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
    post_name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    post_link: string;

    @HasMany(() => PostData)
    postdata: PostData;

}