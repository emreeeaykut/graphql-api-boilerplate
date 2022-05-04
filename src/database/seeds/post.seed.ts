import { Factory, Seeder } from 'typeorm-seeding';
import { Post } from '@entities/post.entity';

export default class PostSeed implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(Post)()
      .map(async (post) => {
        return post;
      })
      .createMany(100);
  }
}
