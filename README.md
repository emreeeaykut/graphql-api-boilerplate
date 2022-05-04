# GRAPHQL API BOILERPLATE

Boilerplate for graphql using Apollo Server Express and powered by TypeORM and TypeGraphQL to make your work is quicker and easier.

## How to Use

1. Rename `.env.example` to `.env`
2. Fill the `.env` with your own configuration
3. Run `yarn` or `npm install` to install the dependencies
4. Run `yarn migrate` or `npm run migrate` to migrate your database
5. Run `yarn seed` or `npm run seed` to seed your database
6. Finally run `yarn dev` or `npm run dev` to start the server in Development Mode

## Example GraphQL queries and mutations

- Get all posts

```graphql
query {
  posts {
    id
    title
    description
    content
    isActive
    createdAt
    updatedAt
  }
}
```

- Get post by id

```graphql
query {
  post(id: 1) {
    id
    title
    description
    content
    isActive
    createdAt
    updatedAt
  }
}
```

- Create post

```graphql
mutation {
  createPost(data: { title: "Post 1", description: "Description 1", content: "Content 1" }) {
    id
    title
    description
    content
    isActive
    createdAt
    updatedAt
  }
}
```

- Update post

```graphql
mutation {
  updatePost(
    id: 1
    data: { title: "Post 1 - edited", description: "Description 1 - edited", content: "Content 1 - edited" }
  ) {
    id
    title
    description
    content
    isActive
    createdAt
    updatedAt
  }
}
```

- Delete post

```graphql
mutation {
  deletePost(id: 2) {
    id
    title
    description
    content
    isActive
    createdAt
    updatedAt
  }
}
```
