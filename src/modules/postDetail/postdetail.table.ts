/* eslint-disable prettier/prettier */
import { Table, Column, Model, DataType, ForeignKey, PrimaryKey, Default } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { PostData } from '../postData/postdata.table';

@Table
export class PostDetail extends Model<PostDetail> {

    @PrimaryKey
    @Default(() => uuidv4())
    @Column({
        type: DataType.UUID,
        allowNull: false,
        defaultValue: () => uuidv4(),
    })
    id: string;
    
    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    detaildata: string;

    @ForeignKey(() => PostData)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    postdata_id: string;
 
}