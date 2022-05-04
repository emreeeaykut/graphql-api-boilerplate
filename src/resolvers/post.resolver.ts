import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { PostService } from '@services/post.service';
import { Post } from '@entities/post.entity';
import { PostInput } from '@inputs/post.input';

@Resolver()
export class PostResolver {
  constructor(private readonly postService: PostService) {
    this.postService = new PostService();
  }

  @Query(() => [Post], { description: 'Get all posts' })
  public async posts(): Promise<Post[]> {
    return await this.postService.getAll();
  }

  @Query(() => Post, { description: 'Get post by id' })
  public async post(@Arg('id') id: number): Promise<Post> {
    return await this.postService.get(id);
  }

  @Mutation(() => Post, { description: 'Create post' })
  public async createPost(@Arg('data') data: PostInput): Promise<Post> {
    return await this.postService.create(data);
  }

  @Mutation(() => Post, { description: 'Update post' })
  public async updatePost(@Arg('id') id: number, @Arg('data') data: PostInput): Promise<Post> {
    return await this.postService.update(id, data);
  }

  @Mutation(() => Post, { description: 'Delete post' })
  public async deletePost(@Arg('id') id: number): Promise<Post> {
    return await this.postService.delete(id);
  }
}
