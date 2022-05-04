import { Service } from 'typedi';
import { DeleteResult, getRepository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Post } from '@entities/post.entity';
import { PostRepository } from '@repositories/post.repository';

@Service()
export class PostService {
  // constructor(@InjectRepository(PostRepository) private readonly postRepository: PostRepository) {}
  public readonly postRepository: PostRepository;

  constructor() {
    this.postRepository = getRepository(Post);
  }

  public async getAll() {
    return await this.postRepository.find();
  }

  public async get(id: number): Promise<Post> {
    const entity = await this.postRepository.findOne(id);

    if (!entity) throw new Error('Post not found');

    return entity;
  }

  public async create(data: Partial<Post>): Promise<Post> {
    return await this.postRepository.save(data);
  }

  public async update(id: number, data: Partial<Post>): Promise<Post> {
    const entity = await this.postRepository.findOne(id);

    if (!entity) throw new Error('Post not found');

    Object.assign(entity, data);

    return await this.postRepository.save(entity);
  }

  public async delete(id: number): Promise<Post> {
    const entity = await this.postRepository.findOne(id);

    if (!entity) throw new Error('Post not found');

    await this.postRepository.delete(id);

    return entity;
  }
}
