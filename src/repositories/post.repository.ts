import { Service } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';
import { Post } from '@entities/post.entity';

@Service()
@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  constructor() {
    super();
  }
}
