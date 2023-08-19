import { Controller, Param, Get, Post, Put, Delete, Req } from 'routing-controllers';

import TopicService from '../services/TopicService';
import UserService from '../services/UserService';

import type { User } from '../models/user';

@Controller('/topics')
export class TopicController {
  @Get('/')
  async getAll() {
    const topics = await TopicService.all();

    return topics;
  }

  @Get('/:id')
  async getOne(@Param('id') id: number) {
    const topic = await TopicService.read(id);

    return topic;
  }

  @Post('/')
  async post(@Req() request: { user: User; body: { title: string; content: string } }) {
    const userData = await UserService.findOrCreate(request.user);
    const result = await TopicService.create(request.body, userData.id);

    return result;
  }

  @Put('/:id')
  async put(@Param('id') id: number, @Req() request: { user: User; body: { title: string; content: string } }) {
    const updatedTopic = await TopicService.update(id, request.user.id, request.body);

    return updatedTopic;
  }

  @Delete('/:id')
  async remove(@Param('id') id: number, @Req() request: { user: User }) {
    const deletedTopic = await TopicService.delete(id, request.user.id);

    return deletedTopic;
  }
}
