import { faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';
import { Post } from '@entities/post.entity';

define(Post, (f: typeof faker) => {
  const post = new Post();

  const title = f.lorem.sentence();
  const description = f.lorem.sentence();
  const content = f.lorem.paragraphs();

  post.title = title;
  post.description = description;
  post.content = content;

  return post;
});
