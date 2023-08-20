import { HttpError, NotFoundError } from 'routing-controllers';

import { Comment } from '../models/comment';
import { Topic } from '../models/topic';
import { User } from '../models/user';

class TopicService {
  async all() {
    const topics = await Topic.findAll({
      order: [['id', 'DESC']],
      include: [
        {
          model: Comment,
          attributes: ['id'],
        },
        {
          model: User,
          attributes: ['id', 'login'],
        },
      ],
      subQuery: false,
    });

    return topics.map((item) => item.get({ plain: true }));
  }

  async read(id: number) {
    const topic = await Topic.findByPk(id);

    if (!topic) {
      throw new NotFoundError('Топик не найден');
    }

    return topic.get({ plain: true });
  }

  async create({ title, content }: { title: string; content: string }, userId: number) {
    const topic = await Topic.create({ title, content, userId });

    return topic.get({ plain: true });
  }

  async update(id: number, userId: number, body: any) {
    const topic = await Topic.findByPk(id);

    if (!topic) {
      throw new NotFoundError('Топик не найден');
    }

    if (topic.dataValues.userId !== userId) {
      throw new HttpError(403, 'У вас нет прав редактировать этот топик');
    }

    const updatedTopic = await topic.set(body).save();

    return updatedTopic.get({ plain: true });
  }

  async delete(id: number, userId: number) {
    const topic = await Topic.findByPk(id);

    if (!topic) {
      throw new NotFoundError('Топик не найден');
    }

    if (topic.dataValues.userId !== userId) {
      throw new HttpError(403, 'У вас нет прав удалить этот топик');
    }

    await topic.destroy();

    return true;
  }
}

export default new TopicService();
