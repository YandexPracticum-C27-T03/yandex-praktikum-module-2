import { Controller, Param, Get, Post, Delete, Req } from 'routing-controllers';

import CommentService from '../services/CommentService';
import UserService from '../services/UserService';

import type { Comment } from '../models/comment';
import type { User } from '../models/user';

@Controller('/comments')
export class CommentController {
  @Post('/')
  async post(@Req() request: { body: Comment; user: User }) {
    const userData = await UserService.findOrCreate(request.user);
    const result = await CommentService.create(request.body, userData.id);

    return result;
  }

  @Delete('/:id')
  async remove(@Param('id') id: number, @Req() request: { user: User }) {
    return CommentService.delete(id, request.user.id);
  }

  @Get('/:topicId')
  async getAll(@Param('topicId') id: number) {
    const comments = await CommentService.findAllByTopicId(id);

    return comments;
  }
}
