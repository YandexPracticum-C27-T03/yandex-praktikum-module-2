import { Controller, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';

@Controller('/comments')
export class CommentController {
  @Post('/')
  post() {
    return 'Posted comment';
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    return 'Deleted comment';
  }

  @Get('/:topicId')
  getAll(@Param('topicId') id: number) {
    return 'All comments by topic';
  }
}
