import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { User } from './user';
import { Comment } from './comment';

@Table({
  timestamps: true,
  paranoid: false,
  tableName: 'topics',
})
export class Topic extends Model {
  @Column(DataType.STRING)
  title: string;

  @Column(DataType.TEXT)
  content: string;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Comment, {
    foreignKey: 'topicId',
    onDelete: 'CASCADE',
  })
  comments: Comment[];
}
