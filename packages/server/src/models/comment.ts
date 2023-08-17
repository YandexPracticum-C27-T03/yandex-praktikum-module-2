import { BelongsTo, Column, DataType, ForeignKey, HasMany, Index, Model, Table } from 'sequelize-typescript';
import { User } from './user';
import { Topic } from './topic';

@Table({
  timestamps: true,
  paranoid: false,
  tableName: 'comments',
})
export class Comment extends Model {
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column(DataType.TEXT)
  content: string;

  @ForeignKey(() => Comment)
  @Column(DataType.INTEGER)
  parentId: number;

  @ForeignKey(() => Topic)
  @Index
  @Column(DataType.INTEGER)
  topicId: number;

  @BelongsTo(() => Topic)
  topic: Topic;

  @HasMany(() => Comment, {
    foreignKey: 'parentId',
    onDelete: 'CASCADE',
  })
  child?: Comment[];
}
