import { User } from '..//models/user';

class UserService {
  async findOrCreate(data: { login: string; avatar: string; id: number }) {
    const [user] = await User.findOrCreate({
      where: {
        id: data.id,
      },
      defaults: data,
    });

    return user;
  }
}

export default new UserService();
